/**
 * Created by Administrator on 2017/5/17.
 */
whaleModule.controller("HomebigController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.$state = $state;
    $scope.$on('$stateChangeSuccess', function(){
        if(window.location.href.indexOf("?user_id=") !== -1){
            var code=window.location.href.split("?user_id=")[1];
            console.log(code);
            $http.get("/account/usercontroller/code",{
                params:{
                    user_id:code
                }
            }).success(function (data) {
                console.log(data);
                if (data.code == 0) {
                    $scope.openflag_1=true;
                    $("body").css("overflow","hidden");
                    whale.store("user_id_code",code);
                }else if(data.code == 1) {
                    alert("你已激活，请登录");
                    window.location.href="#/";
                }else if(data.code == 42100) {
                    alert("用户不存在");
                    window.location.href="#/";
                }
            });

        }
    });

    $scope.closedpassword=function(){
        $scope.loginInf={
            name11:"",
            password11:"",
            password21:""
        }
        $scope.error=false;
        $scope.openflag_1=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'visible'
        })
    }
    $scope.loginInf={
        name11:"",
        password11:"",
        password21:""
    }
    $scope.submitpassword=function(){
        if ($scope.loginInf.name11&&$scope.loginInf.name11.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.name11)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入旧密码";
            $scope.error=true;
            return
        }
        if ($scope.loginInf.password11&&$scope.loginInf.password11.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.password11)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入密码";
            $scope.error=true;
            return
        }
        if ($scope.loginInf.password21&&$scope.loginInf.password21.length>0) {
            if(!(whale.password_bat).test($scope.loginInf.password21)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                if($scope.loginInf.password21!=$scope.loginInf.password11){
                    $scope.error_wenzi="密码不一致";
                    $scope.error=true;
                    return
                }
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入确认密码";
            $scope.error=true;
            return
        }
        //submit
        var datt={
            id:whale.store("user_id_code"),
            oldpwd: hex_md5(hex_md5($scope.loginInf.name11)),
            newpwd: hex_md5(hex_md5($scope.loginInf.password11))
        }
        $http.post("/account/usercontroller/editDefaultPwd",datt).success(function (data) {
            console.log(data);
            if (data.code == 10200) {
                $rootScope.errormsg = '修改成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("user_id_code");
                    $scope.closedlogin();
                    window.location.href="#/";
                }, 1500);
            }else if (data.code == 42122||data.code == 42123||data.code == 42124) {
                $scope.error_wenzi=data.note;
                $scope.error=true;
                return
            }else {
                $scope.error_wenzi="网络异常，请稍后重试";
                $scope.error=true;
                return
            }
        });
    }

    if(whale.store("orgId")){
        $scope.username_flag=true;
        task1();
    }

    $scope.closedlogin=function(){
        $scope.loginInfo={
            name1:"",
            password1:""
        }
        $scope.registerInfo={
            name:"",
            password:"",
            phone:"",
            YZM:"",
            email:"",
            repassword:""
        }
        whale.removestore("sendtimeRegister");
        $scope.error=false;
        $scope.openflag=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'visible'
        })
    }
    $scope.loginInfo={
        name1:"",
        password1:""
    }
    $scope.registerInfo={
        name:"",
        password:"",
        phone:"",
        YZM:"",
        email:"",
        repassword:""
    }
    whale.removestore("sendtimeRegister");
    $scope.registerYZM=function(){
        if (whale.store("sendtimeRegister")) {
            return false;
        }
        if ($scope.registerInfo.phone&&$scope.registerInfo.phone.length>0) {
            if(!(whale.phone_bat).test($scope.registerInfo.phone)){
                $scope.error_wenzi="你输入的手机号码格式不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入手机号码";
            $scope.error=true;
            return
        }
        var resend=$("#registerYZM");
        var datas = {
            params:{
                Phone:$scope.registerInfo.phone
            }
        };
        $http.get("/account/applycontroller/sendMsgCode", datas).success(function (data) {
            if (data.code === 10200) {
                whale.store("sendtimeRegister", "no");
                $scope.error_wenzi="发送成功，请注意查收";
                $scope.error=true;
                var count = 60;
                var inter=setInterval(thst,1000)
                function thst() {
                    if (count > 0) {
                        count--;
                        resend.html(count + "s")
                    } else {
                        resend.html("重新发送");
                        clearInterval(inter);
                        whale.removestore("sendtimeRegister");
                    }
                }
            }else if(data.code === 10010){
                $scope.error_wenzi="发送验证码失败";
                $scope.error=true;
            }else if(data.code === 10009){
                $scope.error_wenzi=data.note;
                $scope.error=true;
            }else{
                $scope.error_wenzi="网络错误，请稍后重试";
                $scope.error=true;
            }
        }).error(function(){
            $scope.error_wenzi="网络错误，请稍后重试";
            $scope.error=true;
        })
    }
    $scope.submitlogin=function(){
        if ($scope.loginInfo.name1&&$scope.loginInfo.name1.length>0) {
            if(!(whale.email_pat).test($scope.loginInfo.name1)){
                $scope.error_wenzi="你输入的账号不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入账号";
            $scope.error=true;
            return
        }
        if ($scope.loginInfo.password1&&$scope.loginInfo.password1.length>0) {
            if(!(whale.password_bat).test($scope.loginInfo.password1)){
                $scope.error_wenzi="密码格式不正确(6-22位，且不包含特殊字符)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入密码";
            $scope.error=true;
            return
        }
        //submit  hex_md5(hex_md5($scope.loginInfo.password1))
        var datt={
            username: whale.Trim($scope.loginInfo.name1),
            password: hex_md5(hex_md5($scope.loginInfo.password1))
        }
        $http.post("/account/usercontroller/login",datt).success(function (data) {
            console.log(data);
            if (data.code == 10200) {
                $rootScope.errormsg = '登录成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
                whale.store("username",data.name);
                whale.store("creattime",data.startTime);
                whale.store("orgId",data.orgId);
                whale.store("user_id",data.data.user_id);
                whale.store("accessToken",data.data.accessToken);
                $scope.closedlogin();
                $scope.username_flag=true;
                //直接打开爬虫应用
                $rootScope.crawler_close=true;
                $("body").css("overflow","hidden");

                $http.get("/task/taskcontroller/queryApplicationHead"+"?accessToken="+whale.store("accessToken"),{
                    params: {
                        orgId: whale.store("orgId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        $scope.CrawlerApply=data.data;
                    }
                }).error(function(data) {
                    if (data.code == 41400) {
                        $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                        $timeout(function () {
                            $rootScope.errormsg = null;
                            whale.removestore("orgId");
                            whale.removestore("appid");
                            window.history.go(0);
                            location.reload()
                        }, 1500);
                        return
                    }
                });

                task1()
            }else if (data.code == 42104||data.code == 42100||data.code == 42103||data.code == 42101||data.code == 42117) {
                $scope.error_wenzi=data.note;
                $scope.error=true;
                return
            }else if(data.code==42107){
                $scope.error_wenzi='用户未激活,请查看邮件进行激活';
                $scope.error=true;
                return
            }else {
                $scope.error_wenzi="网络异常，请稍后重试";
                $scope.error=true;
                return
            }
        });
    }
    $scope.submitregister=function(){
        if ($scope.registerInfo.email&&$scope.registerInfo.email.length>0) {
            if(!(whale.email_pat).test($scope.registerInfo.email)){
                $scope.error_wenzi="你输入的邮箱格式不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入邮箱";
            $scope.error=true;
            return
        }
        if ($scope.registerInfo.name&&$scope.registerInfo.name.length>0) {

        }else{
            $scope.error_wenzi="请输入用户名";
            $scope.error=true;
            return
        }
        if ($scope.registerInfo.phone&&$scope.registerInfo.phone.length>0) {
            if(!(whale.phone_bat).test($scope.registerInfo.phone)){
                $scope.error_wenzi="你输入的手机号码格式不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入手机号码";
            $scope.error=true;
            return
        }
        if ($scope.registerInfo.YZM&&$scope.registerInfo.YZM.length>0) {
            if(!(/^([0-9]{6}$)/).test($scope.registerInfo.YZM)){
                $scope.error_wenzi="你输入的验证码格式不正确，请重新输入";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入验证码";
            $scope.error=true;
            return
        }
        if ($scope.registerInfo.password&&$scope.registerInfo.password.length>0) {
            if(!(whale.account_bat).test($scope.registerInfo.password)){
                $scope.error_wenzi="密码格式不正确(6-18位数字与字母组合的密码)";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入密码";
            $scope.error=true;
            return
        }
        if ($scope.registerInfo.repassword&&$scope.registerInfo.repassword.length>0) {
            if($scope.registerInfo.repassword!==$scope.registerInfo.password){
                $scope.error_wenzi="密码不一致";
                $scope.error=true;
                return
            }else{
                $scope.error=false;
            }
        }else{
            $scope.error_wenzi="请输入确认密码";
            $scope.error=true;
            return
        }
        //submit  hex_md5(hex_md5($scope.loginInfo.password1))
        var datt={
            email:$scope.registerInfo.email,
            phone:$scope.registerInfo.phone,
            loginName: $scope.registerInfo.name,
            password: hex_md5(hex_md5($scope.registerInfo.password)),
            repassword: hex_md5(hex_md5($scope.registerInfo.repassword))
        }
        $http.post("/whaleApiMgr/apiUserWebService/addApiUser",datt).success(function (data) {
            if (data.code == 10200) {
                $scope.error_wenzi="注册成功";
                $scope.error=true;
                return
            }
        });
    }
    $scope.usernameenter=function(flag){
        $scope.user_change=flag;
    }
    $scope.openlogin=function(flag){
        $scope.openflag=true;
        $scope.openflag_LR=flag;
        $("body").css("overflow","hidden");
        $timeout(function(){
            var login=document.getElementById('login');
            login.onkeydown=function(event){
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode==13){ // enter 键
                    $scope.submit();
                    $scope.$apply()
                }
            };
        },1000)
    }
    $scope.changeLR=function(flag){
        if(flag=='login'){
            $scope.registerInfo={
                name:"",
                password:"",
                phone:"",
                YZM:"",
                email:"",
                repassword:""
            }
            whale.removestore("sendtimeRegister");
        }
        if(flag=='register'){
            $scope.loginInfo={
                name1:"",
                password1:""
            }
        }
        $scope.error=false;
        $scope.openflag_LR=flag;
    }
    $scope.Crawler_close=function(){
        //$scope.crawler_close=true;
        $rootScope.crawler_close=true;
        $("body").css("overflow","hidden");

        $http.get("/task/taskcontroller/queryApplicationHead"+"?accessToken="+whale.store("accessToken"),{
            params: {
                orgId: whale.store("orgId")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.CrawlerApply=data.data;
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
                return
            }
        });
    }
    function task1(){
        $http.get("/task/appcontroller/queryFirstCrawCount"+"?accessToken="+whale.store("accessToken"),{
            params: {
                orgId: whale.store("orgId")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.usercount={};
                var count={};
                count.costTime=data.data.costTime;
                count.appcount=data.data.appcount;
                count.totalCount=data.data.totalCount;
                count.crawlNum=data.data.crawlNum;
                count.username=whale.store("username");
                count.time=whale.store("creattime");
                $scope.usercount=count;
            }else if(data.code == 60100||data.code == 60110){
                $scope.usercount={};
                var count={};
                count.costTime=0;
                count.appcount=0;
                count.totalCount=0;
                count.crawlNum=0;
                count.username=whale.store("username");
                count.time=new Date().getTime();
                $scope.usercount=count;
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
                return
            }
        });

    }
    $scope.loginout=function(){
        $http.post("/account/usercontroller/loginout"+"?accessToken="+whale.store("accessToken")).success(function (data) {
            if (data.code == 10200) {
                $rootScope.errormsg = '退出成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
            }else if(data.code == 41400||data.code==41401){
                $rootScope.errormsg = '退出成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
                return
            }else {
                $rootScope.errormsg = '网络异常，请稍后重试';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
}])
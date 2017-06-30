/**
 * Created by Administrator on 2017/6/13.
 */
whaleModule.controller("whaleController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.$on('$stateChangeStart', function(event,toState, toParams, fromState, fromParams){//本页面后退或前进  点击进入下一页
        if(toState.name=="whale.index"){
            return
        }
        if(whale.store("TaskToken")){

        }else{
            $scope.data = {
                account:"",
                phone:"",
                YZM:""
            }
            $scope.errorFlag=false;
            whale.removestore("sendtime1");
             event.preventDefault(); //阻止路由跳转
            $state.go("whale.index");
            $('#myModalToken').modal('show');
        }
    });
    $scope.$on('$stateChangeSuccess', function(event,toState, toParams, fromState, fromParams){//其他页面进入可触发  本页面刷新
        if(toState.name=="whale.index"){
            return
        }
        if(whale.store("TaskToken")){

        }else{
            $scope.data = {
                account:"",
                phone:"",
                YZM:""
            }
            $scope.errorFlag=false;
            whale.removestore("sendtime1");
             event.preventDefault(); //阻止路由跳转
            $state.go("whale.index");
            $('#myModalToken').modal('show');
        }
    });
    $scope.data = {
        account:"",
        phone:"",
        YZM:""
    }
    $scope.sendYZM=function(){
        if (whale.store("sendtime1")) {
            return false;
        }
        if ($scope.data.phone&&$scope.data.phone.length>0) {
            if(!(whale.phone_bat).test($scope.data.phone)){
                $scope.errorWen="你输入的手机号码格式不正确，请重新输入";
                $scope.errorFlag=true;
                return
            }else{
                $scope.errorFlag=false;
            }
        }else{
            $scope.errorWen="请输入手机号码";
            $scope.errorFlag=true;
            return
        }

        $http.post("/account/usercontroller/selectphone",{
            phone:$scope.data.phone,
            usertype:2
        }).success(function (data) {
            if (data.code == 10200) {
                var resend=$("#YZM2");
                var datas = {
                    params:{
                        Phone:$scope.data.phone
                    }
                };
                $http.get("/account/applycontroller/sendMsgCode", datas).success(function (data) {
                    if (data.code === 10200) {
                        whale.store("sendtime1", "no");
                        $scope.errorWen="发送成功，请注意查收";
                        $scope.errorFlag=true;
                        var count = 60;
                        var inter=setInterval(thst,1000)
                        function thst() {
                            if (count > 0) {
                                count--;
                                resend.html(count + "s")
                            } else {
                                resend.html("重新发送");
                                clearInterval(inter);
                                whale.removestore("sendtime1");
                            }
                        }
                    }else if(data.code === 10010){
                        $scope.errorWen="发送验证码失败";
                        $scope.errorFlag=true;
                    }else if(data.code === 10009){
                        $scope.errorWen=data.note;
                        $scope.errorFlag=true;
                    }else{
                        $scope.errorWen="网络错误，请稍后重试";
                        $scope.errorFlag=true;
                    }
                }).error(function(){
                    $scope.errorWen="网络错误，请稍后重试";
                    $scope.errorFlag=true;
                })
            }else{
                $scope.errorWen=data.note;
                $scope.errorFlag=true;
                return
            }
        }).error(function(data){
            if(data.code==400500){
                $scope.errorWen="请使用管理员账户";
                $scope.errorFlag=true;
                return
            }
        });

    }
    $scope.submitToken=function(){
        if ($scope.data.phone&&$scope.data.phone.length>0) {
            if(!(whale.phone_bat).test($scope.data.phone)){
                $scope.errorWen="你输入的手机号码格式不正确，请重新输入";
                $scope.errorFlag=true;
                return
            }else{
                $scope.errorFlag=false;
            }
        }else{
            $scope.errorWen="请输入手机号码";
            $scope.errorFlag=true;
            return
        }
        if ($scope.data.YZM&&$scope.data.YZM.length>0) {
            if(!(/^([0-9]{6}$)/).test($scope.data.YZM)){
                $scope.errorWen="你输入的验证码格式不正确，请重新输入";
                $scope.errorFlag=true;
                return
            }else{
                $scope.errorFlag=false;
            }
        }else{
            $scope.errorWen="请输入验证码";
            $scope.errorFlag=true;
            return
        }
        //submit  hex_md5(hex_md5($scope.loginInfo.password1))
        var datt={
            params:{
                phone:$scope.data.phone,
                code:$scope.data.YZM
            }
        }
        $http.get("/whaleApiMgr/taskReward/codetest",datt).success(function (data) {
            if (data.code == 10200) {
                //$('#myModalTip').modal('hide');
                $http.post("/account/usercontroller/selectphone",{
                    phone:$scope.data.phone,
                    usertype:2
                }).success(function (data) {
                    if (data.code == 10200) {
                        $rootScope.errormsg = '登陆成功';
                        whale.store("TaskToken",$scope.data.phone)
                        $('#myModalToken').modal('hide');
                        $timeout(function() {
                            $rootScope.errormsg = null;
                        }, 1500);
                        return;
                    }else{
                        $scope.errorWen=data.note;
                        $scope.errorFlag=true;
                        return
                    }
                }).error(function(data){
                    if(data.code==400500){
                        $scope.errorWen="请使用管理员账户";
                        $scope.errorFlag=true;
                        return
                    }
                });
            }else{
                $scope.errorWen=data.note;
                $scope.errorFlag=true;
                return
            }
        });
    }
}])
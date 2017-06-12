/**
 * Created by Administrator on 2017/6/1.
 */
whaleModule.controller("AccountController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.infoAccount={
        loginName:"",
        apiSercret:"",
        phone:"",
        phone1:"",
        email:"",
        email1:"",
        YZM1:"",
        YZM2:""
    }
    $http.post("/whaleApiMgr/apiUserWebService/getApiUser"+"?accessToken="+whale.store("accessToken")+"&userId="+whale.store("user_id")).success(function (data) {
     if (data.code == 10200) {
            $.extend($scope.infoAccount, data.data)
         }
     });
    $(document).ready(function(){
        $(".APIKEYkey1").click(function(){
            $(".APIKEY2").slideToggle(500);
            if($(".APIKEYkey2").is(":hidden")){
                $timeout(function(){
                    $(".APIKEY1").show();
                },500)
            }else{
                $(".APIKEY1").hide();
            }

        });
        $(".PHONEkey1").click(function(){
            $(".PHONE2").slideToggle(500);
            if($(".PHONEkey2").is(":hidden")){
                $timeout(function(){
                    $(".PHONE1").show();
                },500)
            }else{
                $(".PHONE1").hide();
            }

        });
        $(".EMAILkey1").click(function(){
            $(".EMAIL2").slideToggle(500);
            if($(".EMAILkey2").is(":hidden")){
                $timeout(function(){
                    $(".EMAIL1").show();
                },500)
            }else{
                $(".EMAIL1").hide();
            }

        });
    })

    whale.removestore("sendtime1");
    whale.removestore("sendtime2");
    $scope.APIKEY_yzm=function(){
        if (whale.store("sendtime1")) {
            return false;
        }
        if ($scope.infoAccount.phone&&$scope.infoAccount.phone.length>0) {
            if(!(whale.phone_bat).test($scope.infoAccount.phone)){
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
        var resend=$("#YZM1");
        var datas = {
            params:{
                Phone:$scope.infoAccount.phone
            }
        };
        $http.get("/account/applycontroller/sendMsgCode", datas).success(function (data) {
            if (data.code === 10200) {
                whale.store("sendtime1", "no");
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
                        whale.removestore("sendtime1");
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
    $scope.PHONE_yzm=function(){
        if (whale.store("sendtime2")) {
            return false;
        }
        if ($scope.infoAccount.phone&&$scope.infoAccount.phone.length>0) {
            if(!(whale.phone_bat).test($scope.infoAccount.phone)){
                $scope.error_wenzi1="你输入的手机号码格式不正确，请重新输入";
                $scope.error1=true;
                return
            }else{
                $scope.error1=false;
            }
        }else{
            $scope.error_wenzi1="请输入手机号码";
            $scope.error1=true;
            return
        }
        var resend=$("#YZM2");
        var datas = {
            params:{
                Phone:$scope.infoAccount.phone
            }
        };
        $http.get("/account/applycontroller/sendMsgCode", datas).success(function (data) {
            if (data.code === 10200) {
                whale.store("sendtime2", "no");
                $scope.error_wenzi1="发送成功，请注意查收";
                $scope.error1=true;
                var count = 60;
                var inter=setInterval(thst,1000)
                function thst() {
                    if (count > 0) {
                        count--;
                        resend.html(count + "s")
                    } else {
                        resend.html("重新发送");
                        clearInterval(inter);
                        whale.removestore("sendtime2");
                    }
                }
            }else if(data.code === 10010){
                $scope.error_wenzi1="发送验证码失败";
                $scope.error1=true;
            }else if(data.code === 10009){
                $scope.error_wenzi1=data.note;
                $scope.error1=true;
            }else{
                $scope.error_wenzi1="网络错误，请稍后重试";
                $scope.error1=true;
            }
        }).error(function(){
            $scope.error_wenzi1="网络错误，请稍后重试";
            $scope.error1=true;
        })
    }
    $scope.APIKEY=function(){
        if(!(/^([0-9]{6}$)/.test($scope.infoAccount.YZM1) && $scope.infoAccount.YZM1.length > 1)){
            $scope.error_wenzi="验证码格式有误";
            $scope.error=true;
            return
        }
        $http.post("/whaleApiMgr/apiUserWebService/resetApikey"+"?accessToken="+whale.store("accessToken")+"&phone="+$scope.infoAccount.phone+"&code="+$scope.infoAccount.YZM1).success(function (data) {
            if (data.code == 10200) {
                $scope.error_wenzi="重置成功";
                $scope.error=true;
            }else if(data.code ==50500||data.code ==20104||data.code ==430100||data.code ==20102){
                $scope.error_wenzi=data.note;
                $scope.error=true;
                return
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                return
            }
        });
    }
    $scope.phone=function(){
        if(!(/^([0-9]{6}$)/.test($scope.infoAccount.YZM2) && $scope.infoAccount.YZM2.length > 1)){
            $scope.error_wenzi1="验证码格式有误";
            $scope.error1=true;
            return
        }
        $http.post("/whaleApiMgr/apiUserWebService/resetApikey"+"?accessToken="+whale.store("accessToken")+"&phone="+$scope.infoAccount.phone1+"&code="+$scope.infoAccount.YZM2).success(function (data) {
            if (data.code == 10200) {
                $scope.error_wenzi1="重置成功";
                $scope.error1=true;
            }else if(data.code ==50500||data.code ==20104||data.code ==430100||data.code ==20102){
                $scope.error_wenzi1=data.note;
                $scope.error1=true;
                return
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                return
            }
        });
    }
}])
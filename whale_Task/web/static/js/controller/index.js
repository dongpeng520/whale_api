/**
 * Created by Administrator on 2017/6/13.
 */
whaleModule.controller("indexController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.data = {
        account:"",
        phone:"",
        YZM:""
    }

    $http.get("/whaleApiMgr/taskReward/selectTaskRewardFirst").success(function (data) {
        if (data.code == 10200) {
            $scope.order=data.data;
            $scope.picloading=false;
        }
    });
    $scope.renLing=function(id){
        whale.removestore("sendtime1");
        whale.store("rewardId",id);
        $scope.errorWen="";
        $scope.errorFlag=false;
        $scope.data = {
            account:"",
            phone:"",
            YZM:""
        }
    }
    whale.removestore("sendtime1");
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
        var resend=$("#YZM1");
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
    }
    $scope.submit=function(){
        if ($scope.data.account&&$scope.data.account.length>0) {

        }else{
            $scope.errorWen="请输入用户名";
            $scope.errorFlag=true;
            return
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
            name:$scope.data.account,
            phone:$scope.data.phone,
            rewardId: whale.store("rewardId"),
            code:$scope.data.YZM
        }
        $http.post("/whaleApiMgr/taskReward/addtaskRegister",datt).success(function (data) {
            if (data.code == 10200) {
                $scope.errorWen="认领成功";
                $scope.errorFlag=true;
                $('#myModalTip').modal('hide');
                $scope.picloading=true;
                $http.get("/whaleApiMgr/taskReward/selectTaskRewardFirst").success(function (data) {
                    if (data.code == 10200) {
                        $scope.order=data.data;
                        $scope.picloading=false;
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
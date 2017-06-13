/**
 * Created by Administrator on 2017/6/1.
 */
whaleModule.controller("ModifyController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.data={
        currentPassword:"",
        password:"",
        passwordComire:""
    }
    $scope.modify=function(){
        if ($scope.data.currentPassword==""||$scope.data.password==""||$scope.data.passwordComire=="") {
            $scope.error_wenzi="请填写完整";
            $scope.error=true;
            return
        }
        //submit
        var datt={
            id:whale.store("user_id"),
            oldpwd: hex_md5(hex_md5($scope.data.currentPassword)),
            newpwd: hex_md5(hex_md5($scope.data.password))
        }
        $http.post("/account/usercontroller/editPwd"+"?accessToken="+whale.store("accessToken"),datt).success(function (data) {
            console.log(data);
            if (data.code == 10200) {
                $rootScope.errormsg = '修改成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
            }else if (data.code == 42122||data.code == 42123||data.code == 42124) {
                $scope.error_wenzi=data.note;
                $scope.error=true;
                return
            }else if(data.code == 41400||data.code==41401){
                $rootScope.errormsg = '无效的accessToken,请重新登录';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                return
            }else {
                $scope.error_wenzi="网络异常，请稍后重试";
                $scope.error=true;
                return
            }
        }).error(function(){
            $rootScope.errormsg = '无效的accessToken,请重新登录';
            $timeout(function() {
                $rootScope.errormsg = null;
                whale.removestore("orgId");
                whale.removestore("appid");
                $location.path('/');
            }, 1500);
            return
        });
    }

}])
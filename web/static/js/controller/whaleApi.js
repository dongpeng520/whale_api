/**
 * Created by Administrator on 2017/5/18.
 */
whaleModule.controller("whaleAPIController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.get("/whaleApiMgr/apiInfowebServiceController/selectApiInfobycategroy").success(function (data) {
        if (data.code == 10200) {
            $scope.picloading=false;
            $scope.selectApiInfobycategroy=data.data;
            $scope.picurl="http://api.eyee.com/Shop/system/main/4b5e19cdd4dd4246bea9d0928fcb945e.png";
        }
    });
    $scope.whaleAPIClassify=function(id){
        whale.store("categroyid",id);
    }
    $scope.enterDetail=function(id,dd){
        whale.store("apiId",id);
        whale.store("api",dd)
    }
}])
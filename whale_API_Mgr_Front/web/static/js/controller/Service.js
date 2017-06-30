/**
 * Created by Administrator on 2017/6/2.
 */
whaleModule.controller("ServiceController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.get("/api/getApiServiceDetail",{
        params:{
            id: whale.store("id")
        }
    }).success(function (data) {//监控节点-api服务
        if (data.code == 10200) {
            $scope.getApiServiceDetail=data.data;
        }
    })
}])
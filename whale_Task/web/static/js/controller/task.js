/**
 * Created by Administrator on 2017/6/14.
 */
whaleModule.controller("taskController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.picload=true;
    $http.get("/whaleApiMgr/taskReward/unclaim").success(function (data) {
        if (data.code == 10200) {
            $scope.order1=data.data;
            var a="order1 ng-scope";
            $scope.$broadcast('loading.request',a);
        }
    });
    $http.get("/whaleApiMgr/taskReward/claimed").success(function (data) {
        if (data.code == 10200) {
            $scope.order2=data.data;
            var a="order2 ng-scope";
            $scope.$broadcast('loading.request',a);
        }
    });
}])
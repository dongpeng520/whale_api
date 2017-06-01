/**
 * Created by Administrator on 2017/5/24.
 */
whaleModule.controller("detailController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.picurl="http://api.eyee.com/Shop/system/main/4b5e19cdd4dd4246bea9d0928fcb945e.png";
    $scope.DataCategory=["今日统计","API调用文档","返回码","调用日志","接入指南"];
    $scope.selectCategory=function(index){
        if($scope.current==index){
            return
        }
        $scope.current=index;
        $scope.$broadcast("detailApi.request",index)
        whale.store("category",index);
    }
    /*$http.get("/whaleApiMgr/apiInfowebServiceController/selectApiInfobycategroy"+"?accessToken="+whale.store("accessToken"),{
     params: {
     orgId: whale.store("orgId"),
     appId: whale.store("appid"),
     PageIndex:1,
     PageSize:5
     }
     }).success(function (data) {
     if (data.code == 10200) {
     $scope.historyCenter=data;
     $scope.count=data.total;
     }
     });*/
}])
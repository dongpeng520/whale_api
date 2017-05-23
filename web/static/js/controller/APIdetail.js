/**
 * Created by Administrator on 2017/5/19.
 */
whaleModule.controller("APIdetailController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.DataCategory=["API调用文档","返回码","接入指南"];
    var DataCategory1=[1,2,3,4,5,6,7,8,9,10,11];
    $timeout(function(){
        $scope.$broadcast("sendParent_history",DataCategory1)
    },1000)
    $scope.APITry= function (name) {
        $scope.name=name;
    }
    $scope.selectCategory=function(index){
        if($scope.current==index){
            return
        }
        $scope.current=index;
        $scope.$broadcast("detailApi.request",index)
        whale.store("category",index);
        if(whale.store("starttime")&&whale.store("endtime")){
            var starttime=whale.store("starttime");
            var endtime=whale.store("endtime");
            $scope.$broadcast('sendParent_time',starttime,endtime);//监听在子控制器中定义的 点击切换品类 事件
        }else{
            $scope.$broadcast('sendParent_over',index);//监听在子控制器中定义的 点击切换品类 事件
        }
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
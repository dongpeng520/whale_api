/**
 * Created by Administrator on 2017/5/24.
 */
whaleModule.controller("detailController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.api=whale.store("api");
    $scope.DataCategory=["今日统计","API调用文档","返回码","调用日志","接入指南"];
    $scope.selectCategory=function(index){
        if($scope.current==index){
            return
        }
        $scope.current=index;
        $scope.$broadcast("detailApi.request",index)
        whale.store("category",index);
    }

    $scope.buyInfo={
        chargeCount:"",
        remark:""
    }
    $scope.buy=function(){
        if(!whale.store("orgId")){
            alert("用户未登录");
            return
        }
        if($scope.buyInfo.chargeCount==""){
            $scope.buyFlagWen="请填写购买次数";
            $scope.buyFlag=true;
            return
        }
        if(!(/^([1-9][0-9]*)$/.test($scope.buyInfo.chargeCount))){
            $scope.buyFlagWen="请填写正确的购买次数";
            $scope.buyFlag=true;
            return
        }
        $http.post("/whaleApiMgr/applyForHist/recharge"+"?accessToken="+whale.store("accessToken"),{
            apiID:whale.store("apiId"),
            chargeCount:$scope.buyInfo.chargeCount,
            status:2,
            remark:"购买充值"
        }).success(function (data) {
            if (data.code == 10200) {
                //$scope.ApplyedApi=data.data;
                $('#myModalAPIBuy').modal('hide')
                $('#myModalAPITip').modal('show')
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
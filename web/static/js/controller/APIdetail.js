/**
 * Created by Administrator on 2017/5/19.
 */
whaleModule.controller("APIdetailController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.DataCategory=["API调用文档","返回码","接入指南"];
    $scope.api=whale.store("api");

    //1申请试用
    //2购买充值
    $scope.lijiTry=function(){
        if(!whale.store("accessToken")){
            alert("用户未登录");
            return
        }
        $http.post("/whaleApiMgr/applyForHist/recharge"+"?accessToken="+whale.store("accessToken"),{
            apiID:whale.store("apiId"),
            chargeCount:100,
            status:1,
            remark:"申请试用"
        }).success(function (data) {
            if (data.code == 10200) {
                //$scope.ApplyedApi=data.data;
                $('#myModalAPITry').modal('hide')
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
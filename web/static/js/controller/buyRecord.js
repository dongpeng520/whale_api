/**
 * Created by Administrator on 2017/5/26.
 */
whaleModule.controller("buyRecordController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.DataCategory1=["全部","七天内","1个月内","3个月内"]
    $scope.DataCategory2=["全部","购买成功","已退款"]
    $scope.current1="全部";
    $scope.current2="全部";
    $scope.changeDataCategory1=function(index){
        if(index==$scope.current1){
            return
        }
        $scope.current1=index;
        var today=new Date().getTime();
        if(index=="全部"){
            whale.store("startDate","");
            whale.store("endDate","");
        }else if(index=="七天内"){
            whale.store("startDate",today-604800000);
            whale.store("endDate",today);
        }else if(index=="1个月内"){
            whale.store("startDate",today-2592000000);
            whale.store("endDate",today);
        }else if(index=="3个月内"){
            whale.store("startDate",today-77760000000);
            whale.store("endDate",today);
        }
        $scope.$broadcast("sendParent_history","")
    }
    $scope.changeDataCategory2=function(index){
        if(index==$scope.current2){
            return
        }
        $scope.current2=index;
        if(index=="全部"){
            whale.store("status","");
        }else if(index=="购买成功"){
            whale.store("status",1);
        }else if(index=="已退款"){
            whale.store("status",2);
        }
        $scope.$broadcast("sendParent_history","")
    }
    $scope.renderFinish1flag=true;
    $scope.renderFinish1=function(){
        if($scope.renderFinish1flag==false){
            return
        }
        whale.store("startDate","");
        whale.store("endDate","");
        whale.store("status","");
        $scope.$broadcast("sendParent_history","");
        $scope.renderFinish1flag=false;
    }
}])
/**
 * Created by Administrator on 2017/5/19.
 */
whaleModule.controller("classifyAPIController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){

    $http.get("/whaleApiMgr/apiInfowebServiceController/selectApiInfobycategroy").success(function (data) {
         if (data.code == 10200) {
             $scope.DataCategory=data.data;
             if(whale.store("categroyid")==""){
                 $scope.current="全部分类";
                 var categroyid=""
             }else{
                 $scope.current=whale.store("categroyid").categroyName;
                 var categroyid=whale.store("categroyid").apiInfocategroyid;
             }
             $scope.$broadcast("sendParent_history",categroyid)
         }
     });
    $scope.selectCategory=function(index){//选择爬虫类型结果
        if(index.categroyName==$scope.current){
            return
        }
        whale.store("categroyid",index);
        var categroyid;
        if(index==""){
            $scope.current="全部分类";
            categroyid="";
        }else{
            $scope.current=index.categroyName;
            categroyid=index.apiInfocategroyid
        }
        $scope.$broadcast("sendParent_history",categroyid)
    }

}])
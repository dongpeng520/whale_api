/**
 * Created by Administrator on 2017/5/19.
 */
whaleModule.directive('orderClassify',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        function httpquery(data1,index,flag){
            scope.picloading=true;
            $http.get("/whaleApiMgr/apiInfowebServiceController/selectbycategroyid",{
                params: {
                    categroyid: data1,
                    PageIndex:index,
                    PageSize:2
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.DataCategory1=data.data;
                    scope.picloading=false;
                    $rootScope.$broadcast('history.page', data.total,2, flag);  //发送给pagemiddle  页码长度
                }
            });
        }
        scope.$on('sendParent_history',function(event,data){//监听在子控制器中定义的 点击切换品类 事件
            httpquery(data,1)
        });
        scope.$on('pagehistory.request', function (e, req,flag) { //监听在子控制器中定义的 分页点击 事件
            if(whale.store("categroyid")==""){
                httpquery("",req,flag);
            }else{
                httpquery(whale.store("categroyid").apiInfocategroyid,req,flag);
            }
        });
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/dir_classify.html",
        controller:["$scope",function($scope){
            $scope.enterDetail=function(id){
                whale.store("apiId",id)
            }
        }],
        link: linkFunction
    }
}])
whaleModule.directive('detailApi',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.picloading=true;
        $timeout(function(){
            scope.current ='API调用文档';
            scope.picloading=false;
        },1000)
        scope.$on('detailApi.request', function (e, req) { //监听在子控制器中定义的 分页点击 事件
            scope.picloading=true;
            $timeout(function(){
                scope.current =req;
                scope.picloading=false;
            },1000)
        });
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/detailApi.html",
        link: linkFunction
    }
}])
whaleModule.directive('apiLoading',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.picloading=true;
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/loading.html",
        link: linkFunction
    }
}])

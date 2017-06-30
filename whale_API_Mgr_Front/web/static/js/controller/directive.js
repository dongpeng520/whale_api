/**
 * Created by Administrator on 2017/5/16.
 */
whaleModule.directive('picLoading',["$http",function($http){
    var linkFunction=function(scope,$element,attr){
        scope.$on('loading.request', function (e, req) {
            if($element[0].parentNode.className==req){
                scope.picloading=false;
                return
            }
        });
    }
    return {
        restrict: "E",
        replace:true,
        scope: {
            picloading: '@picload'
        },
        templateUrl: "static/template/loading.html",
        link: linkFunction
    }
}])
whaleModule.directive('orderList',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        function httpquery(index,flag){
            scope.picloading=true;
            $timeout(function(){
                $(".pic_loading").css("background","#f5f5f5");
            },20)
            $http.get("/whale_alarm/getLogs",{
                params: {
                    serviceName: whale.store("serviceName"),
                    token:whale.store("token"),
                    startTime:whale.store("starttime"),
                    endTime:whale.store("endtime"),
                    level:whale.store("level"),
                    begin:index,
                    length:50
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.order=data.data.logs;
                    scope.picloading=false;
                    $('html,body').animate({scrollTop:320},600);
                    $rootScope.$broadcast('history.page', data.data.page.count,50, flag);  //发送给pagemiddle  页码长度
                }
            });
        }
        scope.$on('sendParent_history',function(event,data){//监听在子控制器中定义的 点击切换品类 事件
            httpquery(1)
        });
        scope.$on('pagehistory.request', function (e, req,flag) { //监听在子控制器中定义的 分页点击 事件
            httpquery(req,flag)
        });
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/orderList.html",
        link: linkFunction
    }
}])
whaleModule.directive('apiLoading',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.picloading=true;
        $timeout(function(){
            /*console.log($("#pic_loading"));
            console.log(document.getElementById("pic_loading"));
            console.log(element[0])
            console.log($(element[0]))
            console.log($(element))
            console.log(element)*/
            $(".pic_loading").css("background","#f5f5f5");
        },50)
        /*$timeout(function(){
            element[0].style.backgroundColor = '#fff';
        },500)*/
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/loading.html",
        link: linkFunction
    }
}])

whaleModule.directive('historytaskpageMiddle',["$rootScope",function($rootScope){
    var linkFunction=function(scope,element,attr){
        scope.$on('history.page', function (e, req,index,flag) { //监听在不同品类变化页码
            scope.p_pernum=index;
            if(flag){
                scope.count=req;
                scope._get(scope.p_current,scope.p_pernum);
            }else{
                scope.count=req;
                //初始化第一页
                scope.p_current = 1;
                scope._get(scope.p_current,scope.p_pernum);
            }
        });
    }
    return {
        restrict: "E",
        controller : ["$scope",function($scope){
            /*var res={
             "count":240,
             }*/


            //配置
            $scope.count = 0;
            $scope.p_pernum = 5;
            //变量
            $scope.p_current = 1;
            $scope.p_all_page =0;
            $scope.pages = [];

            //分页算法
            $scope.calculateIndexes = function (current, length, displayLength) {
                var indexes = [];
                var start = Math.round(current - displayLength / 2);
                var end = Math.floor(current + displayLength / 2);
                if (start <= 1) {
                    start = 1;
                    end = start + displayLength - 1;
                    if (end >= length - 1) {
                        end = length - 1;
                    }
                }
                if (end >= length - 1) {
                    end = length;
                    start = end - displayLength + 1;
                    if (start <= 1) {
                        start = 1;
                    }
                }
                for (var i = start; i <= end; i++) {
                    indexes.push(i);
                }
                return indexes;
            };
            //初始化页码
            $scope.reloadPnofun = function(){
                $scope.pages=$scope.calculateIndexes($scope.p_current,$scope.p_all_page,5);
            };
            //获取数据
            $scope._get = function(page,size){
                //$scope.count=res.count;
                $scope.p_current = page;
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);
                $scope.reloadPnofun();
            }
            //首页
            $scope.p_index = function(){
                if($scope.p_current==1){
                    return
                }
                $scope.load_page(1);
            }
            //尾页
            $scope.p_last = function(){
                if($scope.p_current==$scope.p_all_page||$scope.p_all_page==0){
                    return
                }
                $scope.load_page($scope.p_all_page);
            }
            //加载某一页
            $scope.load_page = function(page){
                if(page==$scope.p_current){
                    return
                }
                $scope._get(page,$scope.p_pernum);
                $rootScope.$broadcast('pagehistory.request', page,true);//true 表示点击页面换数据的时候，不需要重载页面
            };
            $scope.p_pre=function(){
                if($scope.p_current==1){
                    return
                }
                $scope.p_current=$scope.p_current-1;
                $scope._get($scope.p_current,$scope.p_pernum);
                $rootScope.$broadcast('pagehistory.request', $scope.p_current,true);//true 表示点击页面换数据的时候，不需要重载页面
            }
            $scope.p_next=function(){
                if($scope.p_current==$scope.p_all_page||$scope.p_all_page==0){
                    return
                }
                $scope.p_current=$scope.p_current+1;
                $scope._get($scope.p_current,$scope.p_pernum);
                $rootScope.$broadcast('pagehistory.request', $scope.p_current,true);//true 表示点击页面换数据的时候，不需要重载页面
            }
        }],
        replace:true,
        templateUrl: "static/template/taskpage.html",
        link: linkFunction
    }
}])


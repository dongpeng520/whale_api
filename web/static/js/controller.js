/**
 * Created by Peter on 17/11/2.
 */
window.whaleModule = angular.module('whaleModule', ['ngAnimate','ui.router']);
whaleModule.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.
    state('index', {
        abstract: true,
        url: '/index',
        controller: "HomebigController",
        templateUrl: 'static/template/indexhome.html'
    }).
    state('index.indexhome', {
        url: '/indexhome',
        controller: "HomesmallController",
        templateUrl: 'static/template/homeindex.html'
    }).
    state('index.whalehome', {
        url: '/whalehome',
        controller: "HomeController",
        templateUrl: 'static/template/home.html'
    }).
    state('index.whaleAPI', {
        url: '/whaleAPI',
        views:{
            "":{templateUrl: 'static/template/APItemple.html'},
            "header@index.whaleAPI":{
                templateUrl: 'static/template/whaleAPI.html',
                controller: 'whaleAPIController'
            }
        }
    }).
    state('index.whaleAPI.classify', {
        url: '/classify',
        views:{
            "header":{
                templateUrl: 'static/template/classify.html',
                controller: 'classifyAPIController'
            }
        }
    }).
    state('index.whaleAPI.APIdetail', {
        url: '/APIdetail',
        views:{
            "header":{
                templateUrl: 'static/template/APIdetail.html',
                controller: 'APIdetailController'
            }
        }
    }).
    /*state('index.whaleAPI', {
        abstract: true,
        url: '/whaleAPI',
        template: '<div ui-view></div>'
    }).
    state('index.whaleAPI.API', {
        url: '/API',
        templateUrl: 'static/template/whaleAPI.html'
    }).
    state('index.whaleAPI.classify', {
        url: '/classify',
        templateUrl: 'static/template/classify.html'
    }).*/
    state('index.whaleAbout', {
        url: '/whaleAbout',
        templateUrl: 'static/template/aboutUs.html'
    }).
    state('whale', {
        abstract: true,
        url: '/whale',
        template: '<div ui-view></div>'
    }).
    state('whale.overview', {
        url: '/overview',
        controller: "OverviewController",
        templateUrl: 'static/template/overview.html'
    }).
    state('whale.setup', {
        url: '/setup',
        controller: "SetupController",
        templateUrl: 'static/template/setup.html'
    }).
    state('whale.history', {
        url: '/history',
        controller: "HistoryController",
        templateUrl: 'static/template/history.html'
    }).
    /*state('index.whale1', {
        url: '/whale1',
        views:{
            "":{templateUrl: 'static/template/whale2.html'},
            "header@index.whale1":{templateUrl: 'static/template/classify.html'}
        }
    }).
    state('index.whale1.whale2', {
        url: '/whale2',
        views:{
            "content@index.whale1":{templateUrl: 'static/template/classify.html'} //可以不加 @
        }

    }).*/
    state('whale.result', {
        url: '/result',
        controller: "ResultController",
        templateUrl: 'static/template/result.html'
    }).
    state('API', {
        url: '/API',
        controller: "APIController",
        templateUrl: 'static/template/API.html'
    }).
    state('API.view', {
        url: '/view',
        controller: "APIviewController",
        templateUrl: 'static/template/APIview.html'
    }).
    state('API.detail', {
        url: '/detail',
        controller: "detailController",
        templateUrl: 'static/template/detail.html'
    }).
    state('API.Account', {
        url: '/Account',
        controller: "AccountController",
        templateUrl: 'static/template/Account.html'
    }).
    state('API.Modify', {
        url: '/Modify',
        controller: "ModifyController",
        templateUrl: 'static/template/Modify.html'
    }).
    state('API.buyRecord', {
        url: '/buyRecord',
        controller: "buyRecordController",
        templateUrl: 'static/template/buyRecord.html'
    });
    $urlRouterProvider
        .otherwise('/index/indexhome');
    //$locationProvider.html5Mode(true);
}]);
whaleModule.run(['$rootScope','$interval',function($rootScope,$interval){

}])

whaleModule.factory('DateCenter', function() {
    var factory = ["所有","舆情监控","在线电商品牌"];
    return factory;
});

/*app.factory('userData',['$http','$q',function($http,$q){
    return {
        query:function(){
            var deferred = $q.defer();
            $http.get('tpl/user.json').then(function(response){
                deferred.resolve(response);
            })
            return deferred.promise;
        }
    }
}]);
app.controller('myCtrl',['userData','$scope',function(userData,$scope){
    var pro = userData.query();
    pro.then(function(response){
        $scope.user = response.data;
        $scope.name = response.data.name;
    })
}]);*/
whaleModule.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
                scope.$eval( attr.repeatFinish )
            }
        }
    }
})
whaleModule.directive('repeatFinish1',function(){
    return {
        link: function(scope,element,attr){
            scope.$eval( attr.repeatFinish1 )
            /*repeat-finish1="renderFinish1()"*/
        }
    }
})
whaleModule.directive('todayMm', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function datetype1(date,lan){
                    if(lan=="zh"){
                        return "今天";
                    }else if(lan=="en"){
                        return "Today";
                    }else if(lan=="ri"){
                        return "今日";
                    }

                }
                function datetype2(date,lan){
                    if(lan=="zh"){
                        return "昨天";
                    }else if(lan=="en"){
                        return "Yesterday";
                    }else if(lan=="ri"){
                        return "昨日";
                    }
                }
                function datetype3(date,lan){
                    /*if (date) {
                        var Day = date.getDate();
                        month = date.getMonth() + 1;
                        hours=date.getHours();
                        minutes=date.getMinutes();
                        return month + '月' + Day + '日' +' '+ hours + ':' + minutes;
                    }*/

                    if(date){
                        if(lan=="en"){
                            var a=new Date(date).toDateString();
                            a=a.substring(4,10)+","+a.substring(11);
                            return a;
                        }else if(lan=="zh"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]
                            }
                            return a;
                        }else if(lan=="ri"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]
                            }
                            return a;
                        }


                    }

                }
                var ctime = new Date(scope.date);
                scope.$on('sendParent',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    nowtime = new Date().getTime();
                    bettime = (nowtime - ctime.getTime());
                    if (bettime <= 86400000) {
                        scope.timeshow = datetype1(ctime,data);
                    } else if (bettime >= 86400000 && bettime <= 172800000) {
                        scope.timeshow = datetype2(ctime,data);
                    } else if (bettime > 172800000) {
                        scope.timeshow = datetype3(scope.date,data);
                    }
                });
                nowtime = new Date().getTime();
                bettime = (nowtime - ctime.getTime());
                if (bettime <= 86400000) {
                    scope.timeshow = datetype1(ctime,scope.lan);
                } else if (bettime >= 86400000 && bettime <= 172800000) {
                    scope.timeshow = datetype2(ctime,scope.lan);
                } else if (bettime > 172800000) {
                    scope.timeshow = datetype3(scope.date,scope.lan);
                }
            }
        };
    }
]);
whaleModule.directive('timeMm', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function timechange(date,lan){
                    if(date){
                        if(lan=="en"){
                            var a=new Date(date).toDateString();
                            a=a.substring(4,10)+","+a.substring(11)+" ";
                            return a;
                        }else if(lan=="zh"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]+" "
                            }
                            return a;
                        }else if(lan=="ri"){
                            if(new Date(date).toLocaleDateString().indexOf("年") !== -1){
                                return date;
                            }
                            var a=new Date(date).toLocaleDateString();
                            if(a.length>10){
                                a=a.split("/")[0]+"/"+a.split("/")[1]+"/"+a.split("/")[2].match(/\d{1,2}/)[0]+" "
                            }
                            return a;
                        }

                    }

                }
                scope.timeshow=timechange(scope.date,scope.lan);
                scope.$on('sendParent2',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    scope.timeshow=timechange(scope.date,data);
                });
            }
        };
    }
]);
whaleModule.directive('nameLan', ['$rootScope',
    function($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                date: '=creattime',
                lan: '=lan'
            },
            template: "{{timeshow}}",
            link: function(scope, element, attrs) {

                //格式化日期
                function timechange(date,lan){
                    if(date){
                        if(lan=="en"){
                            var a;
                            a=date.substring(0,date.indexOf("("))
                            return a;
                        }else if(lan=="zh"){
                            var a;
                            a=date.substring(date.indexOf("(")+1,date.indexOf(")"));
                            return a;
                        }

                    }

                }
                scope.timeshow=timechange(scope.date,scope.lan);
                scope.$on('sendParent3',function(event,data){//监听在子控制器中定义的 sendParent 事件
                    scope.timeshow=timechange(scope.date,data);
                });
            }
        };
    }
]);
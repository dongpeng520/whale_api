/**
 * Created by Administrator on 2017/5/23.
 */
whaleModule.controller("APIController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $scope.Crawler_close=function(){
        //$scope.$parent.$parent.crawler_close=false;
        $rootScope.crawler_close=false;
        $("body").css({
            "margin-top" : '0px',
            "margin-right" : '0px',
            "overflow" : 'visible'
        })
    }
    $scope.guanli=function(data){
        whale.store("appid",data);
        $rootScope.crawler_close=false;
        if(window.location.href.indexOf("/overview") !== -1){
            window.history.go(0);
            location.reload()
        }else{
            $("body").css({
                "margin-top" : '0px',
                "margin-right" : '0px',
                "overflow" : 'visible'
            })
            $state.go('whale.overview')
        }
    }
    $scope.Crawler_open=function(){
        //$scope.crawler_close=true;
        $rootScope.crawler_close=true;
        $("body").css("overflow","hidden");
        $http.get("/task/taskcontroller/queryApplicationHead",{
            params: {
                orgId: whale.store("orgId"),
                accessToken:whale.store("accessToken")
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $rootScope.CrawlerApply=data.data;
            }
        }).error(function(data) {
            if (data.code == 41400) {
                $rootScope.errormsg = '此用户在另一设备登录，请重新登录';
                $timeout(function () {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    window.history.go(0);
                    location.reload()
                }, 1500);
                return
            }
        });
    }
    $scope.shuaxin=function(){
        window.history.go(0);
        location.reload()
    }
    $scope.gotohome=function(){
        $location.path('/');
    }
    $scope.loginout=function(){
        $http.post("/account/usercontroller/loginout"+"?accessToken="+whale.store("accessToken")).success(function (data) {
            if (data.code == 10200) {
                $rootScope.errormsg = '退出成功';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
            }else if(data.code == 41400||data.code==41401){
                $rootScope.errormsg = '无效的accessToken,请重新登录';
                $timeout(function() {
                    $rootScope.errormsg = null;
                    whale.removestore("orgId");
                    whale.removestore("appid");
                    $location.path('/');
                }, 1500);
                return
            }else {
                $rootScope.errormsg = '网络异常，请稍后重试';
                $timeout(function() {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
}])
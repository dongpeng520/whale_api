/**
 * Created by Administrator on 2017/5/23.
 */
whaleModule.controller("APIviewController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.get("/whaleApiMgr/userApiInfoWebService/ApiCount"+"?accessToken="+whale.store("accessToken")).success(function (data) {
             if (data.code == 10200) {
                 $scope.ApiCount=data.data;
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
    var myChart_zhe = echarts.init(document.getElementById('echarts_zhe'));
    // 绘制图表
    myChart_zhe.setOption({
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            data:[]
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        textStyle: {
            color: '#464646',
            fontSize:14
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [

        ]
    });

    $http.get("/whaleApiMgr/userApiInfoWebService/selectInvokeHistApiCountzhexian"+"?accessToken="+whale.store("accessToken")).success(function (data) {
        if (data.code == 10200) {
            console.log(data)
            if(data.data.length==0){
                return
            }
            $scope.zhexian=[];
            $scope.zhexianTime=[];
            $scope.zhexianName=[];
            angular.forEach(data.data,function(d,index,array){
                $scope.zhexianTime[index]=[];
                for(var s in d){
                    $scope.zhexian[index]={};
                    $scope.zhexian[index].name=s;
                    $scope.zhexian[index].type='line';
                    $scope.zhexian[index].smooth=true;
                    $scope.zhexian[index].stack='总量';
                    $scope.zhexianName.push(s);
                    $scope.zhexian[index].data=[];
                    for(var n in d[s][0]){
                        $scope.zhexian[index].data.push(d[s][0][n]);
                        $scope.zhexianTime[index].push(n);
                    }
                }
            })
            myChart_zhe.setOption({
                legend:{
                    data:$scope.zhexianName
                },
                xAxis: {
                    data: $scope.zhexianTime[0]
                },
                series: $scope.zhexian
            });
            setTimeout(function (){
                window.onresize = function () {
                    myChart_zhe.resize();
                }
            },200)
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
    //
    $http.get("/whaleApiMgr/userApiInfoWebService/ApplyedApi"+"?accessToken="+whale.store("accessToken")).success(function (data) {
        if (data.code == 10200) {
            $scope.ApplyedApi=data.data;
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
    $http.get("/whaleApiMgr/userApiInfoWebService/returnRecommendApi"+"?accessToken="+whale.store("accessToken")).success(function (data) {
        if (data.code == 10200) {
            $scope.returnRecommendApi=data.data;

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
    $scope.renderFinish=function(){
        $scope.$broadcast('echartYuan.request',"");
        /*var a=angular.element(".Api").height()+80;
        $(".over_set").css("height",a+"px");*/
    }
    $scope.enterDetail=function(id,dd){
        whale.store("apiId",id);
        whale.store("api",dd)
    }
}])
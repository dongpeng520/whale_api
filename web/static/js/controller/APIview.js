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
            data:["爬取数量","爬取数量2"]
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
            data: [1,2,3,4]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'爬取数量',
                type:'line',
                smooth: true,
                stack: '总量',
                data:[12,33,444,213]
            },{
                name:'爬取数量2',
                type:'line',
                smooth: true,
                stack: '总量',
                data:[12,33,444,213]
            }
        ]
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
    }
    $scope.enterDetail=function(id,dd){
        whale.store("apiId",id);
        whale.store("api",dd)
    }
}])
/**
 * Created by Administrator on 2017/5/15.
 */
whaleModule.controller("APIController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.get("/whale_alarm/monitor/getApiServiceByApiName",{
        params:{
            apiName: whale.store("apiName")
        }
    }).success(function (data) {//监控节点-api服务
        if (data.code == 10200) {
            $scope.getApiServiceDetail=data.data;
        }
    })

    var echarts_zhe = echarts.init(document.getElementById('echarts_zhe'));
    // 绘制图表
    echarts_zhe.setOption({
        tooltip: {
            trigger: 'axis'
        },
        textStyle: {
            color: '#464646',
            fontSize:14
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [1,2,3,4,5]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:"调用次数",
                type:'line',
                smooth:true,
                stack:'总量',
                data:[1,3,1,4,2]
            }
        ]
    })

    $scope.stop=function(data){
        $scope.stopname=data.apiName;
        $scope.IP=data.ip;
        $scope.httpPort=data.httpPort;
        whale.store("APIdata",data)
    }
    $scope.restart=function(data){
        $scope.restartname=data.apiName;
        $scope.IP=data.ip;
        $scope.httpPort=data.httpPort;
        whale.store("APIdata",data)
    }
    $scope.upgrade=function(data){
        $scope.upgradename=data.apiName;
        $scope.IP=data.ip;
        $scope.httpPort=data.httpPort;
        whale.store("APIdata",data)
    }
    $scope.stopModel=function(){
        var type;
        if(whale.store("APIdata").osName=="windows"){
            type="tomcat";
        }else if(whale.store("APIdata").osName=="linux"){
            type="java";
        }
        $http.post("/whale_alarm/action/execute",{
            "cloudOrSingle":"single",
            "action":"stop",
            "iplist":whale.store("APIdata").ip,
            "project":whale.store("APIdata").apiName,
            "type":type
        }).success(function (data) {//监控节点-api服务
            if (data.code == 10200) {
                console.log(data)
                $('#myModal').modal('hide')
                $('#myModalTip').modal('show')
            }
        })
    }
    $scope.restartModel=function(){
        var type;
        if(whale.store("APIdata").osName=="windows"){
            type="tomcat";
        }else if(whale.store("APIdata").osName=="linux"){
            type="java";
        }
        $http.post("/whale_alarm/action/execute",{
            "cloudOrSingle":"single",
            "action":"restart ",
            "iplist":whale.store("APIdata").ip,
            "project":whale.store("APIdata").apiName,
            "type":type
        }).success(function (data) {//监控节点-api服务
            if (data.code == 10200) {
                console.log(data)
                $('#myModal1').modal('hide')
                $('#myModalTip').modal('show')
            }
        })
    }
    $scope.upgradeModel=function(){
        var type;
        if(whale.store("APIdata").osName=="windows"){
            type="tomcat";
        }else if(whale.store("APIdata").osName=="linux"){
            type="java";
        }
        $http.post("/whale_alarm/action/execute",{
            "cloudOrSingle":"single",
            "action":"start",
            "iplist":whale.store("APIdata").ip,
            "project":whale.store("APIdata").apiName,
            "type":type
        }).success(function (data) {//监控节点-api服务
            if (data.code == 10200) {
                console.log(data)
                $('#myModal2').modal('hide')
                $('#myModalTip').modal('show')
            }
        })
    }
}])

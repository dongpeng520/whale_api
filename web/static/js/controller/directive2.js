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
            $scope.enterDetail=function(id,dd){
                whale.store("apiId",id);
                whale.store("api",dd)
            }
        }],
        link: linkFunction
    }
}])
whaleModule.directive('detailApi',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.picloading=true;
        if(window.location.href.indexOf("/APIdetail") !== -1){//在本页面刷新
            scope.current ="API调用文档";
            $http.get("/whaleApiMgr/apiDocumentWebServiceController/selectDocument",{
                params:{
                    accessToken:"",
                    apiId:whale.store("apiId")
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.selectDocument=data.data;
                    $("#custom-spacing").JSONView(data.data.apiDocument[0].outputCodeDemo, { collapsed: true, nl2br: true, recursive_collapser: true });
                    scope.picloading=false;
                }
            });
        }
        if(window.location.href.indexOf("API/detail") !== -1){//在本页面刷新
            scope.current ="今日统计";
            $http.get("/whaleApiMgr/apiDocumentWebServiceController/totdayInvokeCount"+"?accessToken="+whale.store("accessToken"),{
                params:{
                    apiId:whale.store("apiId")
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    var ApiData=[];
                    var ApiTime=[];
                    for(var a in data.data){
                        ApiTime.push(a);
                        ApiData.push(data.data[a])
                    }
                    var echarts_API = echarts.init(document.getElementById('echarts_API'));
                    // 绘制图表
                    echarts_API.setOption({
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
                            data: ApiTime
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
                                data:ApiData
                            }
                        ]
                    })
                    scope.picloading=false;
                    setTimeout(function (){
                        window.onresize = function () {
                            echarts_API.resize();
                        }
                    },200)
                }
            });
        }
        scope.$on('$locationChangeSuccess', function(){//解决本页面后退前一页面，在"点击"回到本页面的问题
            if(window.location.href.indexOf("/APIdetail") !== -1){
                scope.current ="API调用文档";
                $http.get("/whaleApiMgr/apiDocumentWebServiceController/selectDocument",{
                    params:{
                        accessToken:"",
                        apiId:whale.store("apiId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        scope.selectDocument=data.data;
                        $("#custom-spacing").JSONView(data.data.apiDocument[0].outputCodeDemo, { collapsed: true, nl2br: true, recursive_collapser: true });
                        scope.picloading=false;
                    }
                });
            }
            if(window.location.href.indexOf("API/detail") !== -1){
                scope.current ="今日统计";
                $http.get("/whaleApiMgr/apiDocumentWebServiceController/totdayInvokeCount"+"?accessToken="+whale.store("accessToken"),{
                    params:{
                        apiId:whale.store("apiId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        var ApiData=[];
                        var ApiTime=[];
                        for(var a in data.data){
                            ApiTime.push(a);
                            ApiData.push(data.data[a])
                        }
                        var echarts_API = echarts.init(document.getElementById('echarts_API'));
                        // 绘制图表
                        echarts_API.setOption({
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
                                data: ApiTime
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
                                    data:ApiData
                                }
                            ]
                        })
                        scope.picloading=false;
                        setTimeout(function (){
                            window.onresize = function () {
                                echarts_API.resize();
                            }
                        },200)
                    }
                });
            }
        });
        scope.$on('detailApi.request', function (e, req) { //监听在子控制器中定义的 分页点击 事件
            scope.picloading=true;
            /*$timeout(function(){
                scope.current =req;
                scope.picloading=false;
            },1000)*/
            if(req=="API调用文档"){
                $http.get("/whaleApiMgr/apiDocumentWebServiceController/selectDocument",{
                    params:{
                        accessToken:"",
                        apiId:whale.store("apiId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        scope.selectDocument=data.data;
                        $("#custom-spacing").JSONView(data.data.apiDocument[0].outputCodeDemo, { collapsed: true, nl2br: true, recursive_collapser: true });
                        scope.picloading=false;
                    }
                });
            }
            if(req=="今日统计"){
                $http.get("/whaleApiMgr/apiDocumentWebServiceController/totdayInvokeCount"+"?accessToken="+whale.store("accessToken"),{
                    params:{
                        apiId:whale.store("apiId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        var ApiData=[];
                        var ApiTime=[];
                        for(var a in data.data){
                            ApiTime.push(a);
                            ApiData.push(data.data[a])
                        }
                        var echarts_API = echarts.init(document.getElementById('echarts_API'));
                        // 绘制图表
                        echarts_API.setOption({
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
                                data: ApiTime
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
                                    data:ApiData
                                }
                            ]
                        })
                        scope.picloading=false;
                        setTimeout(function (){
                            window.onresize = function () {
                                echarts_API.resize();
                            }
                        },200)
                    }
                });
            }
            if(req=="返回码"){
                $http.get("whaleApiMgr/apiDocumentWebServiceController/selectCode",{
                    params:{
                        accessToken:"",
                        apiId:whale.store("apiId")
                    }
                }).success(function (data) {
                    if (data.code == 10200) {
                        scope.selectCode=data.data;
                        scope.picloading=false;
                    }
                });
            }
            if(req=="接入指南"){
                scope.picloading=false;
            }
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
whaleModule.directive('recordList',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        function httpquery(index,flag){
            scope.picloading=true;
            $http.get("/whaleApiMgr/userApiInfoWebService/PurchaseHist",{
                params: {
                    accessToken: whale.store("accessToken"),
                    startDate:whale.store("startDate"),
                    endDate:whale.store("endDate"),
                    status:whale.store("status"),
                    PageIndex:index,
                    PageSize:7
                }
            }).success(function (data) {
                if (data.code == 10200) {
                    scope.order=data.data;
                    if(data.data.length==0){
                        data.total=0
                    }
                    scope.picloading=false;
                    $rootScope.$broadcast('history.page', data.total,7, flag);  //发送给pagemiddle  页码长度
                }
            });
        }
        scope.$on('sendParent_history',function(event,data){//监听在子控制器中定义的 点击切换品类 事件
            httpquery(1)
        });
        scope.$on('pagehistory.request', function (e, req,flag) { //监听在子控制器中定义的 分页点击 事件
            httpquery(req,flag);
        });
    }
    return {
        restrict: "E",
        replace:true,
        templateUrl: "static/template/buyRecordlist.html",
        link: linkFunction
    }
}])
whaleModule.directive('echartYuan',["$rootScope","$http","$timeout",function($rootScope,$http,$timeout){
    var linkFunction=function(scope,element,attr){
        scope.$on('echartYuan.request', function (e, req){
            var myChart_zhe1 = echarts.init(element[0]);
            myChart_zhe1.setOption({
                series : [
                    {
                        name: '速度',
                        type: 'gauge',
                        min: 0,
                        max: scope.data.totalCount,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'normal',
                                fontSize: 12,
                                fontStyle: 'italic'
                            }
                        },
                        detail : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'normal',
                                fontSize: 12
                            },
                            formatter:'{value}次'
                        },
                        data:[{value: scope.data.invokeCount, name: scope.data.apiInfo.apiName}]
                    }
                ]
            });
        })

    }
    return {
        restrict: "E",
        replace:true,
        scope:{
            data:"=data"
        },
        template: "<div class='echarts_zhe1'></div>",
        link: linkFunction
    }
}])
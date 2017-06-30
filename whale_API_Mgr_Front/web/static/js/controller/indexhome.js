/**
 * Created by Administrator on 2017/5/15.
 */
whaleModule.controller("indexhomeController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state","$q", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state,$q){
    /*$scope.picload1=true;//在外面改变scope(未进入link指令中)，可单独操作；但是需要每个指令picload="picload1"
    $scope.picload2=true;
    $scope.picload3=true;*/

    $scope.$on('$locationChangeStart', function(){//本页面后退或前进
        window.clearInterval(timer);
        $scope.canvas=false;
    })
    $scope.$on('$locationChangeSuccess', function(){//本页面后退或前进
        window.clearInterval(timer);
        $scope.canvas=false;
    })
    $scope.$on('$stateChangeStart', function(){//本页面后退或前进  点击进入下一页
        window.clearInterval(timer);
        $interval.cancel($scope.timer1);
        $scope.canvas=false;
    });
    $scope.$on('$stateChangeSuccess', function(){//其他页面进入可触发  本页面刷新
        window.clearInterval(timer);
        $scope.canvas=false;
    });

    $scope.picload=true;
    $http.get("/whale_alarm/monitor/allNodes").success(function (data) {//监控节点-所有服务
        if (data.code == 10200) {
            //$scope.picload1=false;
            var a="home1 home";
            $scope.$broadcast('loading.request',a);
            if(data.allServiceNodes==null||data.allServiceNodes.length==0){
                return
            }
            $scope.allServiceNodes=[];
            var requests=[];
            var url="/whale_alarm/getErrorLog";
            angular.forEach(data.allServiceNodes,function(d,index,array){
                for(var s in d){
                    $scope.allServiceNodes[index]={};
                    $scope.allServiceNodes[index].name=s;
                    //requests.push($http.get(url, {params:{size:5,serviceName:s}}))
                    $scope.allServiceNodes[index].running=d[s].running;
                    $scope.allServiceNodes[index].total=d[s].total;
                    if(d[s].running==0){
                        window.clearInterval(timer);
                        $scope.canvas=true;
                        open()
                    }
                }
                if(index==data.allServiceNodes.length-1){

                }
            })
            /*$q.all(requests).then(function(result){
                var a="home4 home";
                $scope.$broadcast('loading.request',a);
                $scope.errorlog=[];//message serviceName
                var a=0;
                angular.forEach(result,function(d,index,array){
                    if(d.data.data==null){
                        return
                    }
                    if(d.data.data.length!=0){
                        $scope.errorlog[a]={};
                        $scope.errorlog[a].serviceName=d.data.data[0].serviceName;
                        $scope.errorlog[a].message=[];
                        angular.forEach(d.data.data,function(d1,index1,array1){
                            $scope.errorlog[a].message[index1]=d1.message;
                        })
                        a++;
                    }
                 })
            })*/
        }
    })
    $http.get("/whale_alarm/monitor/crawlNodes").success(function (data) {//监控节点-爬虫
        if (data.code == 10200) {
            //$scope.picload2=false;
            var a="home2 home";
            $scope.$broadcast('loading.request',a);
            if(data.crawlNodes==null||data.crawlNodes.length==0){
                return
            }
            $scope.crawlNodes=[];
            for(var s in data.crawlNodes[0]){
                $scope.crawlNodes1={};
                $scope.crawlNodes1.name=s;
                $scope.crawlNodes1.shuzu=[];
                var index=0;
                for(var a in data.crawlNodes[0][s]){
                    $scope.crawlNodes1.shuzu[index]={}
                    $scope.crawlNodes1.shuzu[index].name1=a;
                    $scope.crawlNodes1.shuzu[index].running=data.crawlNodes[0][s][a].running;
                    $scope.crawlNodes1.shuzu[index].total=data.crawlNodes[0][s][a].total;
                    $scope.crawlNodes1.shuzu[index].status=data.crawlNodes[0][s][a].status;
                    $scope.crawlNodes1.shuzu[index].endTime=data.crawlNodes[0][s][a].endTime;
                    $scope.crawlNodes1.shuzu[index].startTime=data.crawlNodes[0][s][a].startTime;
                    $scope.crawlNodes1.shuzu[index].taskName=data.crawlNodes[0][s][a].taskName;
                    $scope.crawlNodes1.shuzu[index].totalCount=data.crawlNodes[0][s][a].totalCount;
                    if(data.crawlNodes[0][s][a].running==0){
                        window.clearInterval(timer);
                        $scope.canvas=true;
                        open()
                    }
                    index++;
                }
                $scope.crawlNodes.push($scope.crawlNodes1);
            }
        }
    })
    $http.get("/whale_alarm/monitor/apiNodes").success(function (data) {//监控节点-api服务
        if (data.code == 10200) {
            //$scope.picload3=false;
            var a="home3 home";
            $scope.$broadcast('loading.request',a);
            if(data.ApiNodes==null||data.ApiNodes.length==0){
                return
            }
            $scope.ApiNodes=[];
            angular.forEach(data.ApiNodes,function(d,index,array){
                for(var s in d){
                    $scope.ApiNodes[index]={};
                    $scope.ApiNodes[index].name=s;
                    $scope.ApiNodes[index].running=d[s].running;
                    $scope.ApiNodes[index].total=d[s].total;
                    if(d[s].total==0){
                        $scope.ApiNodes[index].compare =0;
                    }else{
                        $scope.ApiNodes[index].compare =d[s].running/d[s].total;
                    }
                    if(d[s].running==0){
                        window.clearInterval(timer);
                        $scope.canvas=true;
                        open()
                    }
                }
            })
            var compare = function (prop) {
                return function (obj1, obj2) {
                    var val1 = obj1[prop];
                    var val2 = obj2[prop];
                    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                        val1 = Number(val1);
                        val2 = Number(val2);
                    }
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            $scope.ApiNodes.sort(compare("compare"))
        }
    })
    $http.get("/whale_alarm/tokenMap/query").success(function (data) {//API详情
        if (data.code == 10200) {
            //$scope.picload3=false;
            var a="home5 home";
            $scope.APIdetail=data.data;
            $scope.$broadcast('loading.request',a);
        }
    })
    $http.get("/whale_alarm/proxy/getIpStatusByType").success(function (data) {//可用代理  剩余可用
        if (data.code == 10200) {
            //$scope.picload3=false;
            function shuju1(shuju){
                var total=shuju;
                var oldP = 0,
                    newP = total;
                var int = setInterval(function() {
                    oldP += (newP - oldP) * 0.3;
                    $scope.total_ip = parseInt(oldP);
                    if (Math.abs(newP - oldP) < 1) {
                        $scope.total_ip = total;
                        clearInterval(int);
                    }
                    $scope.$apply();
                }, 50);
            }
            function shuju2(shuju){
                var total=shuju;
                var oldP = 0,
                    newP = total;
                var int = setInterval(function() {
                    oldP += (newP - oldP) * 0.3;
                    $scope.free_ip = parseInt(oldP);
                    if (Math.abs(newP - oldP) < 1) {
                        $scope.free_ip = total;
                        clearInterval(int);
                    }
                    $scope.$apply();
                }, 50);
            }
            $scope.total_ip=data.data.total_ip;
            $scope.free_ip=data.data.free_ip;
            shuju1(data.data.total_ip)
            shuju2(data.data.free_ip)
        }
    })
    $scope.API = function(index){
        whale.store("apiName",index)
    }




    $scope.canvas=true;
    function createGradient(width){
        var c = document.getElementById("gradient");
        var ctx = c.getContext("2d");

        ctx.clearRect(0,0, c.width, c.height);


        //var width = width;

        //顶部
        var gradientTop = ctx.createLinearGradient(0,0,0,width);
        gradientTop.addColorStop(0,"red");
        gradientTop.addColorStop(1,"transparent");
        ctx.fillStyle = gradientTop;
        ctx.fillRect(0,0,c.width,width);

        //左边
        var gradientLeft = ctx.createLinearGradient(0,0,width,0);
        gradientLeft.addColorStop(0,"red");
        gradientLeft.addColorStop(1,"transparent");
        ctx.fillStyle = gradientLeft;
        ctx.fillRect(0,0,width,c.height);

        //右边
        var gradientRight = ctx.createLinearGradient(c.width - width,0,c.width,0);
        gradientRight.addColorStop(1,"red");
        gradientRight.addColorStop(0,"transparent");
        ctx.fillStyle = gradientRight;
        ctx.fillRect(c.width - width,0,width,c.height);

        //底部
        var gradientBottom = ctx.createLinearGradient(0,c.height - width,0,c.height);
        gradientBottom.addColorStop(1,"red");
        gradientBottom.addColorStop(0,"transparent");
        ctx.fillStyle = gradientBottom;
        ctx.fillRect(0, c.height - width,c.width,width);
    }

    var side =  30;
    var introdurce = true;

    //开启渐变时钟

    var timer = window.setInterval(function (){
        var offset = 2;
        if (introdurce){
            side = side + offset;
        }
        else {
            side = side - offset;
        }

        if (side >= 35){
            introdurce = false;
        }
        if (side <= 25){
            introdurce = true;
        }
        createGradient(side);
    },100);
    var isStart = true;
    $scope.stopGradient = stopGradient;
    function stopGradient(){
        /*if (isStart){
            console.log('stopGradient');
            window.clearInterval(timer);
            isStart = false;
        }
        else {
            timer = window.setInterval(function (){
                var offset = 2;
                if (introdurce){
                    side = side + offset;
                }
                else {
                    side = side - offset;
                }

                if (side >= 40){
                    introdurce = false;
                }
                if (side <= 20){
                    introdurce = true;
                }
                createGradient(side);
            },100);
            isStart = true;
        }*/
        $scope.canvas=false;
    }
    function open(){
        timer = window.setInterval(function (){
            var offset = 2;
            if (introdurce){
                side = side + offset;
            }
            else {
                side = side - offset;
            }

            if (side >= 40){
                introdurce = false;
            }
            if (side <= 20){
                introdurce = true;
            }
            createGradient(side);
        },100);
    }
    $scope.timer1=$interval(function() {
        $scope.picload=true;
        window.clearInterval(timer);
        $scope.canvas=false;
        $http.get("/whale_alarm/monitor/allNodes").success(function (data) {//监控节点-所有服务
            if (data.code == 10200) {
                //$scope.picload1=false;
                var a="home1 home";
                $scope.$broadcast('loading.request',a);
                if(data.allServiceNodes==null||data.allServiceNodes.length==0){
                    return
                }
                $scope.allServiceNodes=[];
                var requests=[];
                var url="/whale_alarm/getErrorLog";
                angular.forEach(data.allServiceNodes,function(d,index,array){
                    for(var s in d){
                        $scope.allServiceNodes[index]={};
                        $scope.allServiceNodes[index].name=s;
                        //requests.push($http.get(url, {params:{size:5,serviceName:s}}))
                        $scope.allServiceNodes[index].running=d[s].running;
                        $scope.allServiceNodes[index].total=d[s].total;
                        if(d[s].running==0){
                            window.clearInterval(timer);
                            $scope.canvas=true;
                            open()
                        }
                    }
                    if(index==data.allServiceNodes.length-1){

                    }
                })
                /*$q.all(requests).then(function(result){
                    var a="home4 home";
                    $scope.$broadcast('loading.request',a);
                    $scope.errorlog=[];//message serviceName
                    var a=0;
                    angular.forEach(result,function(d,index,array){
                        if(d.data.data==null){
                            return
                        }
                        if(d.data.data.length!=0){
                            $scope.errorlog[a]={};
                            $scope.errorlog[a].serviceName=d.data.data[0].serviceName;
                            $scope.errorlog[a].message=[];
                            angular.forEach(d.data.data,function(d1,index1,array1){
                                $scope.errorlog[a].message[index1]=d1.message;
                            })
                            a++;
                        }
                    })
                })*/
            }
        })
        $http.get("/whale_alarm/monitor/crawlNodes").success(function (data) {//监控节点-爬虫
            if (data.code == 10200) {
                //$scope.picload2=false;
                var a="home2 home";
                $scope.$broadcast('loading.request',a);
                if(data.crawlNodes==null||data.crawlNodes.length==0){
                    return
                }
                $scope.crawlNodes=[];
                for(var s in data.crawlNodes[0]){
                    $scope.crawlNodes1={};
                    $scope.crawlNodes1.name=s;
                    $scope.crawlNodes1.shuzu=[];
                    var index=0;
                    for(var a in data.crawlNodes[0][s]){
                        $scope.crawlNodes1.shuzu[index]={}
                        $scope.crawlNodes1.shuzu[index].name1=a;
                        $scope.crawlNodes1.shuzu[index].running=data.crawlNodes[0][s][a].running;
                        $scope.crawlNodes1.shuzu[index].total=data.crawlNodes[0][s][a].total;
                        $scope.crawlNodes1.shuzu[index].status=data.crawlNodes[0][s][a].status;
                        $scope.crawlNodes1.shuzu[index].endTime=data.crawlNodes[0][s][a].endTime;
                        $scope.crawlNodes1.shuzu[index].startTime=data.crawlNodes[0][s][a].startTime;
                        $scope.crawlNodes1.shuzu[index].taskName=data.crawlNodes[0][s][a].taskName;
                        $scope.crawlNodes1.shuzu[index].totalCount=data.crawlNodes[0][s][a].totalCount;
                        if(data.crawlNodes[0][s][a].running==0){
                            window.clearInterval(timer);
                            $scope.canvas=true;
                            open()
                        }
                        index++;
                    }
                    $scope.crawlNodes.push($scope.crawlNodes1);
                }
            }
        })
        $http.get("/whale_alarm/monitor/apiNodes").success(function (data) {//监控节点-api服务
            if (data.code == 10200) {
                //$scope.picload3=false;
                var a="home3 home";
                $scope.$broadcast('loading.request',a);
                if(data.ApiNodes==null||data.ApiNodes.length==0){
                    return
                }
                $scope.ApiNodes=[];
                angular.forEach(data.ApiNodes,function(d,index,array){
                    for(var s in d){
                        $scope.ApiNodes[index]={};
                        $scope.ApiNodes[index].name=s;
                        $scope.ApiNodes[index].running=d[s].running;
                        $scope.ApiNodes[index].total=d[s].total;
                        if(d[s].running==0){
                            window.clearInterval(timer);
                            $scope.canvas=true;
                            open()
                        }
                    }
                })
            }
        })
        $http.get("/whale_alarm/tokenMap/query").success(function (data) {//API详情
            if (data.code == 10200) {
                //$scope.picload3=false;
                var a="home5 home";
                $scope.APIdetail=data.data;
                $scope.$broadcast('loading.request',a);
            }
        })
        $http.get("/whale_alarm/proxy/getIpStatusByType").success(function (data) {//可用代理  剩余可用
            if (data.code == 10200) {
                //$scope.picload3=false;
                function shuju1(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.total_ip = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.total_ip = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                function shuju2(shuju){
                    var total=shuju;
                    var oldP = 0,
                        newP = total;
                    var int = setInterval(function() {
                        oldP += (newP - oldP) * 0.3;
                        $scope.free_ip = parseInt(oldP);
                        if (Math.abs(newP - oldP) < 1) {
                            $scope.free_ip = total;
                            clearInterval(int);
                        }
                        $scope.$apply();
                    }, 50);
                }
                $scope.total_ip=data.data.total_ip;
                $scope.free_ip=data.data.free_ip;
                shuju1(data.data.total_ip)
                shuju2(data.data.free_ip)
            }
        })

    }, 30000);

}])
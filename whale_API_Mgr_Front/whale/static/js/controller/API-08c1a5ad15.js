whaleModule.controller("APIController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state",function(a,t,e,o,i,l,s,r){o.get("/whale_alarm/monitor/getApiServiceByApiName",{params:{apiName:whale.store("apiName")}}).success(function(t){10200==t.code&&(a.getApiServiceDetail=t.data)}),echarts.init(document.getElementById("echarts_zhe")).setOption({tooltip:{trigger:"axis"},textStyle:{color:"#464646",fontSize:14},xAxis:{type:"category",boundaryGap:!1,data:[1,2,3,4,5]},yAxis:{type:"value"},series:[{name:"调用次数",type:"line",smooth:!0,stack:"总量",data:[1,3,1,4,2]}]}),a.stop=function(t){a.stopname=t.apiName,a.IP=t.ip,a.httpPort=t.httpPort,whale.store("APIdata",t)},a.restart=function(t){a.restartname=t.apiName,a.IP=t.ip,a.httpPort=t.httpPort,whale.store("APIdata",t)},a.upgrade=function(t){a.upgradename=t.apiName,a.IP=t.ip,a.httpPort=t.httpPort,whale.store("APIdata",t)},a.stopModel=function(){var a;"windows"==whale.store("APIdata").osName?a="tomcat":"linux"==whale.store("APIdata").osName&&(a="java"),o.post("/whale_alarm/action/execute",{cloudOrSingle:"single",action:"stop",iplist:whale.store("APIdata").ip,project:whale.store("APIdata").apiName,type:a}).success(function(a){10200==a.code&&(console.log(a),$("#myModal").modal("hide"),$("#myModalTip").modal("show"))})},a.restartModel=function(){var a;"windows"==whale.store("APIdata").osName?a="tomcat":"linux"==whale.store("APIdata").osName&&(a="java"),o.post("/whale_alarm/action/execute",{cloudOrSingle:"single",action:"restart ",iplist:whale.store("APIdata").ip,project:whale.store("APIdata").apiName,type:a}).success(function(a){10200==a.code&&(console.log(a),$("#myModal1").modal("hide"),$("#myModalTip").modal("show"))})},a.upgradeModel=function(){var a;"windows"==whale.store("APIdata").osName?a="tomcat":"linux"==whale.store("APIdata").osName&&(a="java"),o.post("/whale_alarm/action/execute",{cloudOrSingle:"single",action:"start",iplist:whale.store("APIdata").ip,project:whale.store("APIdata").apiName,type:a}).success(function(a){10200==a.code&&(console.log(a),$("#myModal2").modal("hide"),$("#myModalTip").modal("show"))})}}]);
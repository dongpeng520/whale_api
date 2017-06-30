/**
 * Created by Administrator on 2017/6/2.
 */
whaleModule.controller("retrievalController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){

    $(function(){
        //首先将#back-to-top隐藏
        $("#Top").hide();
        //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
        $(function () {
            $(window).scroll(function(){
                if ($(window).scrollTop()>100){
                    $("#Top").fadeIn();
                }
                else
                {
                    $("#Top").fadeOut();
                }
            });
            //当点击跳转链接后，回到页面顶部位置
            $("#Top").click(function(){
                $('body,html').animate({scrollTop:0},500);
                return false;
            });
        });
    });

    $scope.initData={
        serviceName:"''",
        token:"",
        level:"''"
    }

    /*$scope.names = ["Google", "Runoob", "Taobao"];
    $scope.aaa=$scope.names[0];
    $scope.getModel=function(data){
        alert(data);
    }*/
    $http.get("/whale_alarm/getType").success(function (data) {
        if (data.code == 10200) {
            $scope.names=data.data;
        }
    });
    laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
    laydate({
        elem: '#starttime',
        format: 'YYYY-MM-DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true, //显示节日
        istime: true
    });
    laydate({
        elem: '#endtime',
        format: 'YYYY-MM-DD hh:mm:ss', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true, //显示节日
        istime: true
    });

    $scope.result={
        starttime:"",
        endtime:""
    }
    whale.removestore("starttime");
    whale.removestore("endtime");
    $scope.shuaxin=function(){
        $scope.result.starttime=$("#starttime").val();
        $scope.result.endtime=$("#endtime").val();
        var starttime=new Date($scope.result.starttime).getTime();
        var endtime=new Date($scope.result.endtime).getTime();
        if($scope.result.starttime == ''&&$scope.result.endtime == ''){
            starttime="";
            endtime="";
        }
        if($scope.result.starttime == ''&&$scope.result.endtime !== ''||$scope.result.starttime !== ''&&$scope.result.endtime == ''){
            $rootScope.errormsg = '请选择开始时间或结束时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        if(endtime-starttime<0){
            $rootScope.errormsg = '结束时间应该大于开始时间';
            $timeout(function() {
                $rootScope.errormsg = null;
            }, 1500);
            return;
        }
        var serviceName;
        var level;
        if($scope.initData.serviceName=="''"){
            serviceName="";
        }else{
            serviceName=$scope.initData.serviceName
        }
        if($scope.initData.level=="''"){
            level="";
        }else{
            level=$scope.initData.level
        }
        whale.store("starttime",starttime);
        whale.store("endtime",endtime);
        whale.store("serviceName",serviceName);
        whale.store("token",$scope.initData.token);
        whale.store("level",level);
        $scope.$broadcast('sendParent_history',"");//监听在子控制器中定义的 时间查询 事件
    }

    $scope.renderFinish1flag=true;
    $scope.renderFinish1=function(){
        if($scope.renderFinish1flag==false){
            return
        }
        whale.store("serviceName","");
        whale.store("token","");
        whale.store("starttime","");
        whale.store("endtime","");
        whale.store("level","");
        $scope.$broadcast("sendParent_history","");
        $scope.renderFinish1flag=false;
    }
}])
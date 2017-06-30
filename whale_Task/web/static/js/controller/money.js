/**
 * Created by Administrator on 2017/6/13.
 */
whaleModule.controller("moneyController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $(function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({
            elem: '#starttime',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            istime: true
        });
        laydate({
            elem: '#endtime',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            istime: true
        });
    })
    $scope.result={
        starttime:"",
        endtime:""
    }
    whale.removestore("starttime");
    whale.removestore("endtime");
    $scope.search=function(){
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
        }else{
            starttime=$("#starttime").val();
            endtime=$("#endtime").val();
        }
        whale.store("starttime",starttime);
        whale.store("endtime",endtime);
        $scope.$broadcast('sendParent_history',"");//监听在子控制器中定义的 时间查询 事件
    }

    $scope.renderFinish1flag=true;
    $scope.renderFinish1=function(){
        if($scope.renderFinish1flag==false){
            return
        }
        whale.store("starttime","");
        whale.store("endtime","");
        $scope.$broadcast("sendParent_history","");
        $scope.renderFinish1flag=false;
    }
    $scope.viewDetails=function(data){
        $scope.names = data.name;
        $http.get("/whaleApiMgr/taskReward/AmountDetailbyName",{
            params: {
                name:data.name,
                phone:data.phone
            }
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.namesOrder=data.data;
            }
        });
    }
}])
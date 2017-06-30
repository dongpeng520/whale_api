/**
 * Created by Administrator on 2017/6/13.
 */
whaleModule.controller("AccountController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state","$filter", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state,$filter){
    $(function(){
        laydate.skin('molv');//切换皮肤，请查看skins下面皮肤库
        laydate({
            elem: '#endDate',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            istime: true
        });
        laydate({
            elem: '#ModifyendDate',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            festival: true, //显示节日
            istime: true
        });
    })

    $scope.renderFinish1flag=true;
    $scope.renderFinish1=function(){
        if($scope.renderFinish1flag==false){
            return
        }
        whale.store("taskName","");
        $scope.$broadcast("sendParent_history","");
        $scope.renderFinish1flag=false;
    }
    $scope.data = {
        apiName:"",
        apiDesc:"",
        money:"",
        endDate:""
    }
    $scope.Modify = {
        apiName:"",
        apiDesc:"",
        money:"",
        endDate:""
    }
    $scope.accountAdmin=whale.store("TaskToken");
    $scope.tokenAdmin=function(){
        whale.removestore("TaskToken");
        $state.go("whale.index")
    }
    $scope.submitAdd=function(){
        if ($scope.data.apiName&&$scope.data.apiName.length>0) {

        }else{
            $scope.errorWen="请输入爬虫需求";
            $scope.errorFlag=true;
            return
        }
        //reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        var name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        if ($scope.data.apiDesc&&$scope.data.apiDesc.length>0) {
            if(!(name.test($scope.data.apiDesc))){
                $scope.errorWen="请输入正确的网址";
                $scope.errorFlag=true;
                return
            }else{
                $scope.errorFlag=false;
            }
        }else{
            $scope.errorWen="请输入网址";
            $scope.errorFlag=true;
            return
        }
        if($scope.data.money===""){
            $scope.errorWen="请输入悬赏金额";
            $scope.errorFlag=true;
            return
        }
        if(!(/^(0|[1-9][0-9]*)$/.test($scope.data.money))){
            $scope.errorWen="请输入正确的悬赏金额";
            $scope.errorFlag=true;
            return
        }
        var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;//2012-01-21
        $scope.data.endDate=$("#endDate").val();
        var endDate=new Date($scope.data.endDate).getTime();
        var dataNow=new Date().getTime();
        if($scope.data.endDate == ''){
            $scope.errorWen="请输入截止时间";
            $scope.errorFlag=true;
            return
        }
        if(!(reg.test($scope.data.endDate))){
            $scope.errorWen="请输入正确的时间格式";
            $scope.errorFlag=true;
            return
        }
        if(endDate-dataNow<-86400000){
            $scope.errorWen="请输入有效的时间";
            $scope.errorFlag=true;
            return
        }
        $http.post("/whaleApiMgr/taskReward/addTaskReward",{
            apiName:$scope.data.apiName,
            endDate:$scope.data.endDate,
            money:$scope.data.money,
            apiDesc:$scope.data.apiDesc
        }).success(function (data) {
            if (data.code == 10200) {
                $('#myModalTip').modal('hide');
                $scope.$broadcast("sendParent_history","");
                $rootScope.errormsg = '新增成功';
                $timeout(function () {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
    $scope.searchName="";
    $scope.Search=function(){
        /*if ($scope.searchName&&$scope.searchName.length>0) {

        }else{
            $rootScope.errormsg = '请输入关键字';
            $timeout(function () {
                $rootScope.errormsg = null;
            }, 1500);
            return
        }*/
        whale.store("taskName",$scope.searchName);
        $scope.$broadcast("sendParent_history","");
    }
    $scope.Add=function(){
        $scope.errorFlag=false;
    }
    $scope.modify=function(data){
        $scope.errorFlag=false;
        $scope.Modify.apiName=data.apiName;
        $scope.Modify.apiDesc=data.apiDesc;
        $scope.Modify.money=data.money;
        $scope.Modify.endDate=$filter('date')(data.endDate, 'yyyy-MM-dd');
        whale.store("modify",data);
    }
    $scope.submitModify=function(){
        if ($scope.Modify.apiName&&$scope.Modify.apiName.length>0) {

        }else{
            $scope.errorWen="请输入爬虫需求";
            $scope.errorFlag=true;
            return
        }
        //reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        var name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        if ($scope.Modify.apiDesc&&$scope.Modify.apiDesc.length>0) {
            if(!(name.test($scope.Modify.apiDesc))){
                $scope.errorWen="请输入正确的网址";
                $scope.errorFlag=true;
                return
            }else{
                $scope.errorFlag=false;
            }
        }else{
            $scope.errorWen="请输入网址";
            $scope.errorFlag=true;
            return
        }
        if($scope.Modify.money===""){
            $scope.errorWen="请输入悬赏金额";
            $scope.errorFlag=true;
            return
        }
        if(!(/^(0|[1-9][0-9]*)$/.test($scope.Modify.money))){
            $scope.errorWen="请输入正确的悬赏金额";
            $scope.errorFlag=true;
            return
        }
        var reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;//2012-01-21
        $scope.Modify.endDate=$("#ModifyendDate").val();
        var endDate=new Date($scope.Modify.endDate).getTime();
        var dataNow=new Date().getTime();
        if($scope.Modify.endDate == ''){
            $scope.errorWen="请输入截止时间";
            $scope.errorFlag=true;
            return
        }
        if(!(reg.test($scope.Modify.endDate))){
            $scope.errorWen="请输入正确的时间格式";
            $scope.errorFlag=true;
            return
        }
        if(endDate-dataNow<-86400000){
            $scope.errorWen="请输入有效的时间";
            $scope.errorFlag=true;
            return
        }
        $http.post("/whaleApiMgr/taskReward/updateReward",{
            id:whale.store("modify").id,
            apiName:$scope.Modify.apiName,
            endDate:$scope.Modify.endDate,
            money:$scope.Modify.money,
            apiDesc:$scope.Modify.apiDesc
        }).success(function (data) {
            if (data.code == 10200) {
                $('#myModalModify').modal('hide');
                $scope.$broadcast("sendParent_history","");
                $rootScope.errormsg = '修改成功';
                $timeout(function () {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
    $scope.Finsh=function(id,status){
        $http.post("/whaleApiMgr/taskReward/updateStatus",{
            id:id,
            status:status
        }).success(function (data) {
            if (data.code == 10200) {
                $scope.$broadcast("sendParent_history","");
                $rootScope.errormsg = '操作成功';
                $timeout(function () {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
    $scope.select=function(id){
        $http.post("/whaleApiMgr/taskReward/deletetask"+"?id="+id).success(function (data) {
            if (data.code == 10200) {
                $scope.$broadcast("sendParent_history","");
                $rootScope.errormsg = '删除成功';
                $timeout(function () {
                    $rootScope.errormsg = null;
                }, 1500);
                return
            }
        });
    }
}])
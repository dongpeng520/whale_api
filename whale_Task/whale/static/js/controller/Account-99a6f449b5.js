whaleModule.controller("AccountController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state","$filter",function(e,r,a,o,t,i,n,d,s){$(function(){laydate.skin("molv"),laydate({elem:"#endDate",format:"YYYY-MM-DD",festival:!0,istime:!0}),laydate({elem:"#ModifyendDate",format:"YYYY-MM-DD",festival:!0,istime:!0})}),e.renderFinish1flag=!0,e.renderFinish1=function(){0!=e.renderFinish1flag&&(whale.store("taskName",""),e.$broadcast("sendParent_history",""),e.renderFinish1flag=!1)},e.data={apiName:"",apiDesc:"",money:"",endDate:""},e.Modify={apiName:"",apiDesc:"",money:"",endDate:""},e.accountAdmin=whale.store("TaskToken"),e.tokenAdmin=function(){whale.removestore("TaskToken"),d.go("whale.index")},e.submitAdd=function(){if(!(e.data.apiName&&e.data.apiName.length>0))return e.errorWen="请输入爬虫需求",void(e.errorFlag=!0);var a=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;if(!(e.data.apiDesc&&e.data.apiDesc.length>0))return e.errorWen="请输入网址",void(e.errorFlag=!0);if(!a.test(e.data.apiDesc))return e.errorWen="请输入正确的网址",void(e.errorFlag=!0);if(e.errorFlag=!1,""===e.data.money)return e.errorWen="请输入悬赏金额",void(e.errorFlag=!0);if(!/^(0|[1-9][0-9]*)$/.test(e.data.money))return e.errorWen="请输入正确的悬赏金额",void(e.errorFlag=!0);var t=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;e.data.endDate=$("#endDate").val();var i=new Date(e.data.endDate).getTime(),d=(new Date).getTime();return""==e.data.endDate?(e.errorWen="请输入截止时间",void(e.errorFlag=!0)):t.test(e.data.endDate)?i-d<-864e5?(e.errorWen="请输入有效的时间",void(e.errorFlag=!0)):void o.post("/whaleApiMgr/taskReward/addTaskReward",{apiName:e.data.apiName,endDate:e.data.endDate,money:e.data.money,apiDesc:e.data.apiDesc}).success(function(a){if(10200==a.code)return $("#myModalTip").modal("hide"),e.$broadcast("sendParent_history",""),r.errormsg="新增成功",void n(function(){r.errormsg=null},1500)}):(e.errorWen="请输入正确的时间格式",void(e.errorFlag=!0))},e.searchName="",e.Search=function(){whale.store("taskName",e.searchName),e.$broadcast("sendParent_history","")},e.Add=function(){e.errorFlag=!1},e.modify=function(r){e.errorFlag=!1,e.Modify.apiName=r.apiName,e.Modify.apiDesc=r.apiDesc,e.Modify.money=r.money,e.Modify.endDate=s("date")(r.endDate,"yyyy-MM-dd"),whale.store("modify",r)},e.submitModify=function(){if(!(e.Modify.apiName&&e.Modify.apiName.length>0))return e.errorWen="请输入爬虫需求",void(e.errorFlag=!0);var a=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;if(!(e.Modify.apiDesc&&e.Modify.apiDesc.length>0))return e.errorWen="请输入网址",void(e.errorFlag=!0);if(!a.test(e.Modify.apiDesc))return e.errorWen="请输入正确的网址",void(e.errorFlag=!0);if(e.errorFlag=!1,""===e.Modify.money)return e.errorWen="请输入悬赏金额",void(e.errorFlag=!0);if(!/^(0|[1-9][0-9]*)$/.test(e.Modify.money))return e.errorWen="请输入正确的悬赏金额",void(e.errorFlag=!0);var t=/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;e.Modify.endDate=$("#ModifyendDate").val();var i=new Date(e.Modify.endDate).getTime(),d=(new Date).getTime();return""==e.Modify.endDate?(e.errorWen="请输入截止时间",void(e.errorFlag=!0)):t.test(e.Modify.endDate)?i-d<-864e5?(e.errorWen="请输入有效的时间",void(e.errorFlag=!0)):void o.post("/whaleApiMgr/taskReward/updateReward",{id:whale.store("modify").id,apiName:e.Modify.apiName,endDate:e.Modify.endDate,money:e.Modify.money,apiDesc:e.Modify.apiDesc}).success(function(a){if(10200==a.code)return $("#myModalModify").modal("hide"),e.$broadcast("sendParent_history",""),r.errormsg="修改成功",void n(function(){r.errormsg=null},1500)}):(e.errorWen="请输入正确的时间格式",void(e.errorFlag=!0))},e.Finsh=function(a,t){o.post("/whaleApiMgr/taskReward/updateStatus",{id:a,status:t}).success(function(a){if(10200==a.code)return e.$broadcast("sendParent_history",""),r.errormsg="操作成功",void n(function(){r.errormsg=null},1500)})},e.select=function(a){o.post("/whaleApiMgr/taskReward/deletetask?id="+a).success(function(a){if(10200==a.code)return e.$broadcast("sendParent_history",""),r.errormsg="删除成功",void n(function(){r.errormsg=null},1500)})}}]);
/**
 * Created by Administrator on 2017/6/1.
 */
whaleModule.controller("ModifyController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.post("/whaleApiMgr/apiUserWebService/getApiUser"+"?accessToken="+whale.store("accessToken"),{
        userId:whale.store("user_id")
    }).success(function (data) {
        if (data.code == 10200) {
            console.log(data)
        }
    });

}])
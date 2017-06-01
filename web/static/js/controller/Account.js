/**
 * Created by Administrator on 2017/6/1.
 */
whaleModule.controller("AccountController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout","$state", function($scope,$rootScope,$window,$http,$interval,$location,$timeout,$state){
    $http.post("/whaleApiMgr/apiUserWebService/getApiUser"+"?accessToken="+whale.store("accessToken"),{
        userId:whale.store("user_id")
    }).success(function (data) {
     if (data.code == 10200) {
         console.log(data)
         }
     });
    $(document).ready(function(){
        $(".APIKEYkey1").click(function(){
            $(".APIKEY2").slideToggle(500);
            if($(".APIKEYkey2").is(":hidden")){
                $timeout(function(){
                    $(".APIKEY1").show();
                },500)
            }else{
                $(".APIKEY1").hide();
            }

        });
        $(".PHONEkey1").click(function(){
            $(".PHONE2").slideToggle(500);
            if($(".PHONEkey2").is(":hidden")){
                $timeout(function(){
                    $(".PHONE1").show();
                },500)
            }else{
                $(".PHONE1").hide();
            }

        });
        $(".EMAILkey1").click(function(){
            $(".EMAIL2").slideToggle(500);
            if($(".EMAILkey2").is(":hidden")){
                $timeout(function(){
                    $(".EMAIL1").show();
                },500)
            }else{
                $(".EMAIL1").hide();
            }

        });
    })
}])
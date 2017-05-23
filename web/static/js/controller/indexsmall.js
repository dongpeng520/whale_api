/**
 * Created by Administrator on 2017/5/17.
 */
whaleModule.controller("HomesmallController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
    $("#home1").css({
        "background" : 'none',
        "position" : 'absolute'
    })
    $scope.$on('$stateChangeStart', function(){
        $("#home1").css({
            "background" : '#204068',
            "position" : 'relative'
        })
    });
}])
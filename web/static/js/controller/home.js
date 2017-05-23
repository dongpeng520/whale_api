/**
 * Created by peter.dong on 17/3/28.
 */
whaleModule.controller("HomeController",["$scope","$rootScope","$window","$http","$interval","$location","$timeout", function($scope,$rootScope,$window,$http,$interval,$location,$timeout){
    $(function(){
        $('.responsive').slick({
            dots: true,
            autoplay:true,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
        });
    });
    $(".homerightX1").smoove({
        offset  : '10%',
    });
    $(".homerightX2").smoove({
        offset  : '20%',
    });
    $(".homerightX3").smoove({
        offset  : '40%',
    });
    $(".homerightX4").smoove({
        offset  : '50%',
    });
    $(".homerightX5").smoove({
        offset  : '10%',
    });
}])




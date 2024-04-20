var mymodule = angular.module("myModule", []);
mymodule.controller("myController", function ($scope, $http){

    //fetch all shark card
    $scope.jsonAry=[];
    $scope.doShowAll=function(){
        var url="/angular-find-all-shark?city=" + $scope.selCityObj.city + "&domain=" + $scope.selDomain+"&no=" + $scope.selNo;
        alert(url)
        $http.get(url).then(pass,fail);
        function pass(resp){
            $scope.jsonAry=resp.data;
        }
        function fail(resp){
            alert(resp.data);
        }
    }


    //fetch city
    $scope.arr=[];
    $scope.fetchCity=function(){
        var url="/fetch-city";
        $http.get(url).then(pass,fail);
        function pass(resp){
            $scope.cityAry=resp.data;
        }
        function fail(resp){
            alert(resp.data);
        }
    }
    $scope.doCity=function(){
        // alert($scope.selCityObj.city);
    }

});

$(document).ready(function(){
    $("#find").click(function(){
        $("#card").show(300);
    })
})
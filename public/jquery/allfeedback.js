var mymodule = angular.module("itsModule", []);
        mymodule.controller("itsController", function ($scope, $http) {
            //-------------------------------------------------------
            $scope.feedArray=[];
            $scope.showFeedback= function () {
                var url="/show-all-feedback";
                $http.get(url).then(fxOk, fxNotOk);
                function fxOk(response) {
                    $scope.feedArray = response.data;
                }
                function fxNotOk(response) {
                    alert(response.data);
                }
            };
            //-------------------------------------
        });
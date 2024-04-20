var mymodule = angular.module("itsModule", []);
        mymodule.controller("itsController", function ($scope, $http) {
            //-------------------------------------------------------
            $scope.userArray=[];
            $scope.showUsers = function () {
                var url="/show-all-Shark";
                $http.get(url).then(fxOk, fxNotOk);
                function fxOk(response) {
                    $scope.userArray = response.data;
                }
                function fxNotOk(response) {
                    alert(response.data);
                }
            };
            //-------------------------------------

            $scope.blockUser = function (Email) {
                $http.get("/block-user?Email=" + Email).then(fxOk, fxNotOk);
                function fxOk(response) {
                    $scope.showUsers();
                }
                function fxNotOk(response) {
                    alert(response.data);
                }
            };
            //----------------------------------------

            $scope.activateUser = function (Email) {
                $http.get("activate-user?Email=" + Email).then(fxOk, fxNotOk);
                function fxOk(response) {
                    $scope.showUsers();
                }
                function fxNotOk(response) {
                    alert(response.data);
                }
            }
        });
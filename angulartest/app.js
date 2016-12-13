var app = angular.module('erailApp', ["ngRoute"])		
app.config(function ($routeProvider) {
    $routeProvider
    .when("/trains", { templateUrl: "trains.html" })
    .when("/routes", { templateUrl: "routes.html" })
    .when("/pnr", { templateUrl: "pnr.html" })
    //.when("/menu", { templateUrl: "menu.html" })
    .otherwise("/pnr");
})

app.controller('AppController', function ($scope, $http,$filter) {
    $scope.erail = {}
    $scope.searchedtrains =[];
    //if (localStorage.getItem("searchTrains") != undefined && localStorage.getItem("searchTrains") != null && localStorage.getItem("searchTrains") != "") {
    //    $scope.searchedtrains = JSON.parse(localStorage.getItem("searchTrains"));
    //} else {
    //    localStorage.searchTrains=[]
    //}
	
    $scope.getTrains = function () {
        $scope.trains=[];
        var erail = angular.copy($scope.erail);
        //var searchTrains = localStorage.searchTrains;
        //searchTrains.push($scope.erail);
        //localStorage.searchTrains = searchTrains;
        erail.date = $filter('date')(erail.date, "dd-MMM-yyyy");
        var config = {
            params: {"erail":erail}
        }
        $http.get("http://localhost:1337/trains",config)
            .success(function (response) {
                var r = response
                var day = ["Su", "M", "Tu", "W", "Th", "F", "Sa"][new Date($scope.erail.date).getDay()];
                angular.forEach(r.result, function (value) {
                    if (value.rundays.includes(day)) {
                        value.cls = value.cls.split(",")
                        value.cls.splice(value.cls.indexOf("GN"))// remove general seat string
                        $scope.trains.push(value);
                    }
                })
            })
            .error(function (response) {
                console.log(response)
            });
    }

    $scope.getStations = function () {
        $http.get("http://localhost:1337/stations")
            .success(function (response) {
                $scope.stations = response;
                console.log($scope.stations);
            })
            .error(function (response) {
                console.log(response)
            });
    }

    $scope.getRoutes = function () {
        var config = {
            params: { "erail": $scope.erail }
        }
        $http.get("http://localhost:1337/routes", config)
            .success(function (response) {
                var r = response
                $scope.routes = r.result;
                console.log(r)
            })
            .error(function (response) {
                console.log("Error")
                console.log(response)
            });
    }

    $scope.getPnrStatus = function () {
        var config = {
            params: { "erail": $scope.erail }
        }
        $http.get("http://localhost:1337/pnrstatus", config)
            .success(function (response) {
                var r = response
                $scope.pnrDetails = r.result;
                console.log(r)
            })
            .error(function (response) {
                console.log("Error")
                console.log(response)
            });
    }

    $scope.getSeats = function (target,trainno) {
        var erail = angular.copy($scope.erail);
        erail.date = $filter('date')(erail.date, "dd-MMM-yyyy");
        erail.trainno = trainno;
        erail.class = target;
        var config = {
            params: { "erail": erail }
        }
        $http.get("http://localhost:1337/seats", config)
            .success(function (response) {
                var r = response
                $scope.seats = r.result;
            })
            .error(function (response) {
                console.log("Error")
                console.log(response)
            });
    }    
});
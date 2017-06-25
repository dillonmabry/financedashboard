var app = angular.module("mainApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.jsp"
    })
    .when("/dashboard", {
        templateUrl : "dashboard.jsp"
    })
    .when("/home", {
        templateUrl : "home.jsp"
    })
});
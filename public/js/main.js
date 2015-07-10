angular.module('myhours', ['ngRoute', 'ngResource', 'meusComponentes'])
    .config(function($routeProvider, $httpProvider) {
    
        $httpProvider.interceptors.push('meuInterceptor');    
    
        $routeProvider.when('/auth', {
            templateUrl: 'partials/auth.html'
        });
        $routeProvider.when('/years', {
            templateUrl: 'partials/years.html',
            controller: 'YearsController'
        });
        $routeProvider.when('/year/:yearId', {
            templateUrl: 'partials/year.html',
            controller: 'YearController'
        });
        $routeProvider.when('/year', {
            templateUrl: 'partials/year.html',
            controller: 'YearController'
        });
        $routeProvider.otherwise({redirectTo: '/years'});
});
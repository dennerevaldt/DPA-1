(function() {
    'use strict';

    angular
        .module('app.dpa.login')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .otherwise({ templateUrl: 'templates/404.html' });
    }

})();

(function() {
    'use strict';

    angular
        .module('app.dpa.home')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                  InitPublications: InitPublications,
                  InitFriends: InitFriends,
                  InitNotifications: InitNotifications
                }
            })
            .when('/notifications', {
                templateUrl: 'templates/notifications.html',
                controller: 'NotificationController',
                controllerAs: 'vm',
                resolve: {
                  InitNotifications: InitNotifications
                }
            });

        function InitPublications(HomeService) {
            return HomeService.getPublications()
              .then(function(resp) {
                  return resp;
              });
        }

        function InitFriends(HomeService, $cookieStore) {
            var userLogged = $cookieStore.get('socialCookieUni');
            return HomeService.getFriends(userLogged)
              .then(function(resp) {
                  return resp;
              });
        }

        function InitNotifications(HomeService, $cookieStore) {
            var userLogged = $cookieStore.get('socialCookieUni');
            return HomeService.getNotifications(userLogged)
              .then(function(resp) {
                  return resp;
              });
        }
    }

})();

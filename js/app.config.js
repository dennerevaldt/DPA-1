(function() {
    'use strict';

    angular
        .module('app.dpa')
        .run(run);

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'HomeService', 'LoginService'];

    function run($rootScope, $location, $cookieStore, $http, HomeService, LoginService) {

        // populate publications
        $http.get('json/publications.json')
          .then(function(response){
              HomeService.populatePublications(response.data);
          });

        // populate friends
        $http.get('json/friends.json')
          .then(function(response){
              HomeService.populateFriends(response.data);
          });

        // populate users
        $http.get('json/users.json')
          .then(function(response){
              LoginService.populateUsers(response.data);
          });

        // check authenticate user start change route
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var cookieUser = $cookieStore.get('socialCookieUni') || undefined;
            if (!cookieUser) {
                $location.path('/login');
            }
        });
    }
})();

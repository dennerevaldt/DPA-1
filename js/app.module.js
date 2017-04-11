(function() {
    'use strict';

    angular
        .module('app.dpa', [
          'ngRoute',
          'ngCookies',
          'app.dpa.login',
          'app.dpa.home'
        ]);
})();

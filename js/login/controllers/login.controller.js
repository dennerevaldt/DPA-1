(function() {
    'use strict';

    angular
        .module('app.dpa.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$location'];

    /* @ngInject */
    function LoginController(LoginService, $location) {
        var vm = this;
        vm.user = {};
        vm.userCreate = {};
        vm.createNewUser = false;
        vm.submitLogin = submitLogin;
        vm.createUser = createUser;
        vm.submitCreate = submitCreate;

        //////////////

        (function initController () {
            LoginService.clearCredentials();
        })();

        function submitLogin() {
          var user = LoginService.validAccount(vm.user.email, vm.user.pwd);
          if (user) {
            $location.path('/home');
            LoginService.setCredentials(user);
          } else {
            vm.err = 'Usuário não encontrado, verifique e tente novamente';
          }
        }

        function createUser() {
          vm.createNewUser = !vm.createNewUser;
        }

        function submitCreate() {
            var user = LoginService.createAccount(vm.userCreate.name, vm.userCreate.email, vm.userCreate.pwd);
            if (user) {
                $location.path('/home');
                LoginService.setCredentials(user);
            } else {
                vm.errCreate = 'E-mail de usuário já existe, tente outro';
            }
        }
    }
})();

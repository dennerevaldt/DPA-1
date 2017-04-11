(function() {
    'use strict';

    angular
        .module('app.dpa.home')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['LoginService', 'HomeService', '$cookieStore'];

    /* @ngInject */
    function SearchController(LoginService, HomeService, $cookieStore) {
        var vm = this;
        vm.search = search;
        vm.listFriends = [];
        vm.addFriend = addFriend;
        vm.changeTextSearch = changeTextSearch;
        vm.userLogged = $cookieStore.get('socialCookieUni');
        vm.message = undefined;

        ////////

        function search() {
             vm.listFriends = LoginService.searchUser(vm.emailSearch);
        }

        function addFriend(item) {
            HomeService.addFriend(item, vm.userLogged);
            vm.listFriends = [];
            vm.message = 'Adicionado, aguarde confirmação';
            vm.emailSearch = '';
        }

        function changeTextSearch() {
          if(vm.message) {
            vm.message = '';
          }
        }
    }
})();

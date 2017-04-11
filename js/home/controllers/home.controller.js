(function() {
    'use strict';

    angular
        .module('app.dpa.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['HomeService', '$location', '$cookieStore', 'InitPublications', 'InitFriends', 'InitNotifications'];

    /* @ngInject */
    function HomeController(HomeService, $location, $cookieStore, InitPublications, InitFriends, InitNotifications) {
        var vm = this;
        vm.userLogged = $cookieStore.get('socialCookieUni');
        vm.post = {};
        vm.submitPost = submitPost;
        vm.arrPublications = [];
        vm.arrFriends = InitFriends || [];
        vm.loading = false;
        vm.removeFriend = removeFriend;
        vm.notifications = InitNotifications.length || 0;

        activate();

        //////////////

        function activate() {
          if (vm.arrFriends.length) {
            InitPublications.map(function(pub) {
              vm.arrFriends.map(function(friend) {
                  if((pub.user.email === friend.email) && (!pub.publication.private)) {
                    vm.arrPublications.push(pub);
                  } else if (pub.user.email === vm.userLogged.email) {
                    vm.arrPublications.push(pub);
                  }
              });
            });
          } else {
            InitPublications.map(function(pub) {
                if (pub.user.email === vm.userLogged.email) {
                  vm.arrPublications.push(pub);
                }
            });
          }
        }

        function submitPost() {
          vm.loading = true;
          HomeService.getBase64(vm.post.archive[0])
            .then(function(response) {
              var post = {
                user: {
                  name: vm.userLogged.name,
                  email: vm.userLogged.email
                },
                publication: {
                  text: vm.post.textPublication,
                  private: vm.post.private ? true : false,
                  image: response
                }
              };
              HomeService.savePost(post);
              vm.arrPublications.unshift(post);
              vm.post = {};
              vm.loading = false;
            }, function(err) {
              vm.loading = false;
            })
        }

        function removeFriend(item) {
            HomeService.removeFriend(item);
            HomeService.getFriends(vm.userLogged)
              .then(function(friends) {
                vm.arrFriends = friends;
              });
        }
    }

})();

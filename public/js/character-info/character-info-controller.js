(function() {
  'use strict';
  angular.module('starwars').controller('CharacterInfo', CharacterInfo)

  CharacterInfo.$inject = ['$http', '$routeParams'];

  function CharacterInfo($http, $routeParams) {
    var uri = $routeParams.uri;
    var vm = this;
    $http.get('/api/character/' + uri).success(function(response) {
      if (!response.error) {
        vm.character = response[0];
      } else {
        vm.error = response.error;
      }
    });
  }
})();

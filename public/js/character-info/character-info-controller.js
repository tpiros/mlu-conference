(function() {
  'use strict';
  angular.module('starwars').controller('CharacterInfo', CharacterInfo)

  CharacterInfo.$inject = ['$http', '$routeParams'];

  function CharacterInfo($http, $routeParams) {
    var uri = $routeParams.uri;
    var vm = this;
    $http.get('/api/character/' + uri).then(function(response) {
      vm.character = response.data[0];
    }).catch(function(error) {
      console.log(error);
    });;
  }
})();

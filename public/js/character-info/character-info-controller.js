(function() {
  'use strict';
  angular.module('starwars').controller('CharacterInfo', CharacterInfo)

  CharacterInfo.$inject = ['$http', '$routeParams', 'characterfactory'];

  function CharacterInfo($http, $routeParams, characterfactory) {
    var uri = $routeParams.uri;
    var vm = this;
    characterfactory.getOneCharacter(uri).then(function(response) {
      if (!response.error) {
        vm.character = response[0];
      } else {
        vm.error = response.error;
      }
    });
  }
})();

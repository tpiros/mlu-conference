(function() {
  'use strict';
  angular.module('starwars').controller('CharacterInfo', CharacterInfo)

  CharacterInfo.$inject = ['$http', '$routeParams', 'characterfactory'];

  function CharacterInfo($http, $routeParams, characterfactory) {
    var uri = $routeParams.uri;
    var vm = this;
    characterfactory.getOneCharacter(uri).then(function(response) {
      vm.character = response[0];
    }).catch(function(error) {
      console.log(error);
    });
  }
})();

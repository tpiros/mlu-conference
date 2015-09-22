(function() {
  'use strict';
  angular.module('starwars').controller('CharacterList', CharacterList)

  CharacterList.$inject = ['$http', 'characterfactory'];

  function CharacterList($http, characterfactory) {
    var vm = this;
    characterfactory.getAllCharacters().then(function(response) {
      if (!response.error) {
        vm.characters = response;
      } else {
        vm.error = response.error;
      }
    });
  }
})();

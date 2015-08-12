(function() {
  'use strict';
  angular.module('starwars').controller('CharacterList', CharacterList)

  CharacterList.$inject = ['$http'];

  function CharacterList($http) {
    var vm = this;
    $http.get('/api/characters').success(function(response) {
      vm.characters = response;
    });
  }
})();

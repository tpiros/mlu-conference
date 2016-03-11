(function() {
  'use strict';
  angular.module('starwars').controller('CharacterList', CharacterList)

  CharacterList.$inject = ['$http'];

  function CharacterList($http) {
    var vm = this;
    $http.get('/api/characters').then(function(response) {
      vm.characters = response.data;
    }).catch(function(error) {
      console.log(error);
    });
  }
})();

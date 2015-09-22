(function() {
  'use strict';
  angular.module('starwars').controller('SearchController', SearchController);

  SearchController.$inject = ['$http', 'characterfactory'];

  function SearchController($http, characterfactory) {
    var vm = this;

    vm.search = function() {
      characterfactory.search(vm.searchTerm).then(function(response) {
        if (!response.error) {
          vm.results = response;
        } else {
          vm.error = response.error;
        }
      });
    }
  }
})();

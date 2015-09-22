(function() {
  'use strict';
  angular.module('starwars').controller('SearchController', SearchController);

  SearchController.$inject = ['$http', 'characterfactory'];

  function SearchController($http, characterfactory) {
    var vm = this;

    vm.search = function() {
      if (vm.searchTerm) {
        characterfactory.search(vm.searchTerm).then(function(response) {
          if (!response.error) {
            vm.results = response;
            vm.error = '';
          } else {
            vm.error = response.error;
          }
        });
      } else {
        vm.results = '';
        vm.error = 'Please enter a search term.';
      }
    }
  }
})();

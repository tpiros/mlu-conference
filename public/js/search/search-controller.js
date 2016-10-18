(function() {
  'use strict';
  angular.module('starwars').controller('SearchController', SearchController);

  SearchController.$inject = ['$http', 'characterfactory'];

  function SearchController($http, characterfactory) {
    var vm = this;

    vm.search = function() {
      if (vm.searchTerm) {
        characterfactory.search(vm.searchTerm).then(function(response) {
          vm.results = response;
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        vm.results = '';
      }
    }
  }
})();

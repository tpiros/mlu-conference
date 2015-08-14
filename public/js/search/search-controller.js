(function() {
  'use strict';
  angular.module('starwars').controller('SearchController', SearchController);

  SearchController.$inject = ['$http'];

  function SearchController($http) {
    var vm = this;

    vm.search = function() {
      $http.get('/api/search/' + vm.searchTerm).success(function(response) {
        if (!response.error) {
          vm.results = response;
        } else {
          vm.error = response.error;
        }
      });
    }
  }
})();

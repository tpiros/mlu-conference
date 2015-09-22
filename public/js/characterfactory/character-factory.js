(function() {
  'use strict';
  angular.module('starwars').factory('characterfactory', characterfactory);

  characterfactory.$inject = ['$http'];

  function characterfactory($http) {
    return {
      getAllCharacters: getAllCharacters,
      getOneCharacter: getOneCharacter,
      search: search
    };

    function getAllCharacters() {
      return $http.get('/api/characters').then(complete).catch(failed);
    }

    function getOneCharacter(uri) {
      return $http.get('/api/character/' + uri).then(complete).catch(failed);
    }

    function search(searchTerm) {
      return $http.get('/api/search/' + searchTerm).then(complete).catch(failed);
    }

    function complete(response) {
      return response.data
    };

    function failed(error) {
      console.log(error.statusText);
    }
  }

})();

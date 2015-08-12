(function() {
  'use strict';
  angular.module('starwars', ['ngRoute']).config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'public/js/main/main.html',
      controller: 'MainController',
      controllerAs: 'vm'
    })
    .when('/characters', {
      templateUrl: '/public/js/character-list/character-list.html',
      controller: 'CharacterList',
      controllerAs: 'vm'
    })
  }

})();

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
    .when('/character/:uri', {
      templateUrl: '/public/js/character-info/character-info.html',
      controller: 'CharacterInfo',
      controllerAs: 'vm'
    })
    .when('/search', {
      templateUrl: '/public/js/search/search.html',
      controller: 'SearchController',
      controllerAs: 'vm'
    });
  }
})();

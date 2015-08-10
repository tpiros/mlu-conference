(function() {
  'use strict';
  angular.module('starwars', ['ngRoute']).config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider
    .when('/', {
      template: '<p>{{ vm.message }}</p>',
      controller: 'MainController',
      controllerAs: 'vm'
    });
  }

  angular.module('starwars').controller('MainController', MainController);
  function MainController() {
    var vm = this;
    vm.message = 'Hello World!';
  }


})();

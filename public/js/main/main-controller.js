(function() {
  'use strict';
  angular.module('starwars').controller('MainController', MainController);
  function MainController() {
    var vm = this;
    vm.message = 'Hello World!';
  }
})();

'use strict';

(function(angular, window, undefined) {
  angular.module('infinityBoard').controller('logoutController', [
    '$state',
    'UserService',
  function($state, UserService) {
      UserService.deleteToken();
      $state.go('login');
  }]);
})(angular, this);

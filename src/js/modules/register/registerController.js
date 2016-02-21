'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('registerController', [
		'$scope',
		'$state',
		'User',
		'UserService',
	function($scope, $state, User, UserService) {
		$scope.user = {
			username: '',
			email: '',
			password: ''
		};

		$scope.registerUser = function() {
			User.register($scope.user, function(data) {
				UserService.storeToken(data.token);
				UserService.setUser(data);
				$state.go('boards');
			}, function(error) {
				console.log('Registration failed');
			});
		}
	}]);
})(angular, this);

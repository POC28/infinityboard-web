'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('registerController', [
		'$scope',
		'$state',
		'User', 
	function($scope, $state, User) {
		$scope.user = {
			username: '',
			email: '',
			password: ''
		};

		$scope.registerUser = function() {
			console.log($scope.user);

			User.register($scope.user, function(data) {
				console.log(data);
				$state.go('login');
			}, function(error) {
				console.log('Registration failed');
			});
		}
	}]);
})(angular, this);

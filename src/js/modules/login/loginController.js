'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('loginController', [
		'$scope',
		'$state',
		'User',
		'UserService',
	function($scope, $state, User, UserService) {
		//TODO: remove after presentation
		User.login({username: 'default', password: 'password'}, function (data) {
			UserService.storeToken(data.token);

			User.getCurrent(function(data) {
				UserService.setUser(data);
				$state.go('boards');
			});
		});

		return;

		User.getCurrent(function (data) {
			UserService.setUser(data);
			$state.go(boards);
		});

		$scope.user = {
			username: '',
			password: ''
		};

		if(UserService.isAuthenticated()) {
			User.getCurrent(function(data) {
				UserService.setUser(data);
				$state.go('boards');
			}, function(error) {
				console.log('Couldnt fetch current user.');
			});
		}

		$scope.loginUser = function() {
			User.login($scope.user, function(data) {
				UserService.storeToken(data.token);

				User.getCurrent(function(data) {
					UserService.setUser(data);
					$state.go('boards');
				}, function(error) {
					console.log('Couldnt fetch current user.');
				});
			}, function(error) {
				console.log('Registration failed');
			});
		}
	}]);
})(angular, this);

'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('UserService', function() {
		var user = {};

		var setUser = function(user) {
			console.log('Current User: ', user);
			user = user;
		};

		var isAuthenticated = function() {
			if(localStorage.getItem('$infinityBoardToken') === null) {
				return false;
			} else {
				return true;
			}
		};

		var storeToken = function(token) {
			localStorage.setItem('$infinityBoardToken', token);
		};

		var getToken = function() {
			return localStorage.getItem('$infinityBoardToken');
		};

		return {
			storeToken: storeToken,
			getToken: getToken,
			isAuthenticated: isAuthenticated,
			setUser: setUser
		};
	});
})(angular, this);

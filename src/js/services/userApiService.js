'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('User',['$http', 'UserService', 'CONFIG', function($http, UserService, CONFIG) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var UserFn = {};
		var baseUrl = CONFIG.serverUrl;

		UserFn.login = function(user, success, fail) {
			$http({
				method: 'POST',
				url: baseUrl + '/users/login',
				responseType: 'json',
				data: user
			}).success(success).error(fail);
		};

		UserFn.register = function(user, success, fail) {
			$http({
				method: 'POST',
				url: baseUrl + '/users/register',
				responseType: 'json',
				data: user
			}).success(success).error(fail);
		};

		UserFn.getCurrent = function(success, fail) {
			$http({
				method: 'GET',
				url: baseUrl + '/users/current',
				responseType: 'json',
				headers: {
					'Authorization': 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		return UserFn;
	}]);
})(angular, this);
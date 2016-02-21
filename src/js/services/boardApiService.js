'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('Board',['$http', 'UserService', function($http, UserService) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var BoardFn = {};
		var baseUrl = '//infinityboard.herokuapp.com';

		BoardFn.list = function(success, fail) {
			$http({
				method: 'GET',
				url: baseUrl + '/boards',
				responseType: 'json'
			}).success(success).error(fail);
		};

		BoardFn.find = function(id, success, fail) {
			$http({
				method: 'GET',
				url: baseUrl + '/boards/' + id,
				responseType: 'json',
				headers: {
					Authorization: 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		BoardFn.getChildren = function(id, success, fail) {
			$http({
				method: 'GET',
				url: baseUrl + '/boards/' + id + '/children',
				responseType: 'json',
				headers: {
					Authorization: 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		BoardFn.create = function(board, success, fail) {
			$http({
				method: 'POST',
				url: baseUrl + '/boards',
				responseType: 'json',
				data: board,
				headers: {
					Authorization: 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		BoardFn.update = function(id, board, success, fail) {
			$http({
				method: 'PUT',
				url: baseUrl + '/boards/' + id,
				responseType: 'json',
				data: board,
				headers: {
					Authorization: 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		BoardFn.remove = function(id, success, fail) {
			$http({
				method: 'DELETE',
				url: baseUrl + '/boards/' + id,
				responseType: 'json',
				headers: {
					Authorization: 'JWT ' + UserService.getToken()
				}
			}).success(success).error(fail);
		};

		return BoardFn;
	}]);
})(angular, this);
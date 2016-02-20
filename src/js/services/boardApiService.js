'use strict';

angular.module('infinityBoard').factory('Board', function($http) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var BoardFn = {};
	var baseUrl = '//infinityboard.herokuapp.com';

	BoardFn.list = function(success, fail) {
		$http({
			method: 'GET',
			url: '/boards',
			responseType: 'json'
		}).success(success).error(fail);
	};

	BoardFn.find = function(id, success, fail) {
		$http({
			method: 'GET',
			url: '/board/' + id,
			responseType: 'json'
		}).success(success).error(fail);
	};

	BoardFn.create = function(board, success, fail) {
		$http({
			method: 'POST',
			url: '/board',
			responseType: 'json',
			data: board
		}).success(success).error(fail);
	};

	BoardFn.update = function(id, board, success, fail) {
		$http({
			method: 'PUT',
			url: '/board/' + id,
			responseType: 'json',
			data: board
		}).success(success).error(fail);
	};

	BoardFn.remove = function(id, success, fail) {
		$http({
			method: 'DELETE',
			url: '/board/' + id,
			responseType: 'json'
		}).success(success).error(fail);
	};

	return BoardFn;
});
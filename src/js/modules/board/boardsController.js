'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardsController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'UserService',
		'Board',
	function($scope, $state, $stateParams, UserService, Board) {
		$scope.init = function() {
			Board.getRoot(function(data) {
				$state.go('board', {id: data.id});
			}, function(error) {
				console.log('Can\'t find root board!');
			});
		};

		$scope.init();
	}]);
})(angular, this);

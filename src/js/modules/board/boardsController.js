'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardsController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'BoardService', function($scope, $state, $stateParams, BoardService) {
		$scope.board = 'Test board!';
	}]);
})(angular, this);

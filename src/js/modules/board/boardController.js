'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'BoardService', function($scope, $state, $stateParams, BoardService) {
		$scope.currentBoard = $stateParams.id;
		$scope.testEntity = {
			pos: {
				x: 300,
				y: 200
			},
			size: {
				width: 200,
				height: 200
			},
			title: 'Test entity',
			angle: 0
		};

		$scope.testEntity2 = {
			pos: {
				x: 400,
				y: 400
			},
			size: {
				width: 200,
				height: 200
			},
			title: 'Test entity',
			angle: 0
		};

		$scope.board = BoardService.getBoard();
		console.log($scope.board);
	}]);
})(angular, this);

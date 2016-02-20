'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'BoardService', 
	function($scope, $state, $stateParams, BoardService) {
		$scope.currentBoard = $stateParams.id;
		$scope.entities = BoardService.getEntities();
		$scope.board = BoardService.getBoard();

		$scope.removeEntity = function(index) {
			BoardService.removeEntity(index);
		};

		$scope.addEntity = function() {
			BoardService.addEntity();
		};

		$scope.openBoard = function(id) {
			$state.go('board', {id: id});
		};

		$scope.goToParent = function() {
			$state.go('board', {id: BoardService.getParentId()});
		};
	}]);
})(angular, this);

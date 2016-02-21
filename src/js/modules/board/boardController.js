'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'Board',
		'Upload',
	function($scope, $state, $stateParams, Board, Upload) {
		$scope.currentBoard = $stateParams.id;
		$scope.files = [];

		$scope.$watch('files', function () {
	        $scope.upload($scope.files);
	    });

		function init() {
			Board.find($stateParams.id, function(board) {
				console.log(board);
				$scope.board = board;
			}, function(error) {
				console.log('Error!');
			});
		}
		init();

		$scope.upload = function(files) {
			console.log(files);
		};

		$scope.removeEntity = function(index) {
			Board.remove($scope.board.children[index].id, function() {
				$scope.board.children.splice(index, 1);

				Board.update($scope.board.id, $scope.board, function(data) {
					console.log('Saved current board', data)
				}, function(error) {
					console.log('failed to save board!', error);
				});
			}, function() {
				console.log('Error!');
			});
		};

		$scope.addEntity = function() {
			var entity = {
				parentId: $scope.board.id,
				pos: {
					x: 100,
					y: 100
				},
				size: {
					width: 100,
					height: 100
				},
				title: 'Untitled',
				angle: 0
			};

			Board.create(entity, function(data) {
				entity.id = data.id;

				if($scope.board.children) {
					$scope.board.children.push(entity);
				} else {
					$scope.board.children = [ entity ];
				}

				Board.update($scope.board.id, $scope.board, function(data) {
					console.log('Saved current board', data)
				}, function(error) {
					console.log('failed to save board!', error);
				});
			}, function(error) {
				console.log('Error!');
			});
		};

		$scope.editEntity = function(index) {
			$scope.currentEntity = $scope.board.children[index];

			$('#testModal').modal();
		}

		$scope.openBoard = function(id) {
			$state.go('board', {id: id});
		};

		$scope.goToParent = function() {
			$state.go('board', {id: $scope.board.parentId});
		};
	}]);
})(angular, this);

'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'Board',
		'Upload',
		'UserService',
	function($scope, $state, $stateParams, Board, Upload, UserService) {
		if(!UserService.isAuthenticated()) {
			$state.go('login');
		}

		$scope.files = [];

		$scope.$watch('files', function () {
	        $scope.upload($scope.files);
	    });

		function init() {
			Board.find($stateParams.id, function(board) {
				console.log(board);
				$scope.board = board;

				Board.getChildren($stateParams.id, function(children) {
					$scope.children = children;
				}, function(error) {
					console.log('Failed to fetch board children');
				});
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
				parent: $scope.board.id,
				pos: {
					x: 100,
					y: 100
				},
				size: {
					width: 100,
					height: 100
				},
				content: [],
				title: 'Untitled',
				angle: 0
			};

			Board.create(entity, function(data) {
				entity.id = data.id;
				$scope.children.push(data);

				if($scope.board.children) {
					$scope.board.children.push(entity.id);
				} else {
					$scope.board.children = [ entity.id ];
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
			$scope.currentEntity = $scope.children[index];

			$('#editModal').modal('show');
		};

		$scope.saveCurrentEntity = function() {
			$('#editModal').modal('hide');

			Board.update($scope.currentEntity.id, $scope.currentEntity, function(data) {
				console.log('Entity saved', data);
			}, function(error) {
				console.log('Couldn\'t save entity');
			});
		};

		$scope.openBoard = function(id) {
			$state.go('board', {id: id});
		};

		$scope.goToParent = function() {
			$state.go('board', {id: $scope.board.parentId});
		};
	}]);
})(angular, this);

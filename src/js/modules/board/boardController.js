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

		$scope.removeEntity = function(id) {
			console.log('Remove board with id: ' + id);
			
			Board.remove(id, function() {
				for(var index in $scope.board.children) {
					if($scope.board.children[index] === id) {
						$scope.board.children.splice(index, 1);
						break;
					}
				}
				
				for(var index in $scope.children) {
					if($scope.children[index].id === id) {
						$scope.children.splice(index, 1);
						break;
					}
				}

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

				$scope.editEntity(entity.id);

				Board.update($scope.board.id, $scope.board, function(data) {
					console.log('Saved current board', data)
				}, function(error) {
					console.log('failed to save board!', error);
				});
			}, function(error) {
				console.log('Error!');
			});
		};

		$scope.editEntity = function(id) {
			for(var index in $scope.children) {
				if($scope.children[index].id === id) {
					$scope.currentEntity = $scope.children[index];
					break;
				}
			}
			console.log("Edit entity ", $scope.currentEntity);
			
			$('#editModal').modal('show');
		};

		$scope.openBoard = function(id) {
			$state.go('board', {id: id});
		};

		$scope.goToParent = function() {
			$state.go('board', {id: $scope.board.parent});
		};
	}]);
})(angular, this);

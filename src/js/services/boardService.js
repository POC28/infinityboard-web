'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('BoardService',['Board', function(Board) {
		var board = {
			parent: {
				id: '666'
			},
			id: 1,
			title: "Test Board",
			children: [
				{
					pos: {
						x: 300,
						y: 200
					},
					size: {
						width: 200,
						height: 100
					},
					title: 'Test entity',
					angle: 0
				},
				{
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
				}
			]
		};

		var currentZIndex = 1;

		var fetch = function(id) {
			Board.find(id, function(data) {
				console.log(data);
				board = data;
			}, function(error) {
				console.log("Error:", error);
			})
		};

		var getBoard = function() {
			return board;
		};

		var getEntities = function() {
			return board.children;
		};

		var addEntity = function() {
			var entity = {
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

			board.children.push(entity);
		};

		var removeEntity = function(index) {
			board.children.splice(index, 1);
		};

		var getCurrentZIndex = function() {
			return currentZIndex += 1;
		};

		var getParentId = function() {
			return board.parent.id;
		};

		return {
			getBoard: getBoard,
			getEntities: getEntities,
			addEntity: addEntity,
			removeEntity: removeEntity,
			getCurrentZIndex: getCurrentZIndex,
			getParentId: getParentId
		};
	}]);
})(angular, this);

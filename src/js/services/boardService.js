'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('BoardService', function() {
		var board = {
			id: 1,
			title: "Test Board",
		};

		var children = [];
		var currentZIndex = 1;

		var getBoard = function() {
			return board;
		}

		var getCurrentZIndex = function() {
			return currentZIndex += 1;
		}

		return {
			getBoard: getBoard,
			getCurrentZIndex: getCurrentZIndex
		};
	});
})(angular, this);

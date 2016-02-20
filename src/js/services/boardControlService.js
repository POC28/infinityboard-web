'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('BoardControlService', function() {
		var boardPosition = {
			x: 100,
			y: 100
		};

		var getPosition = function() {
			return boardPosition;
		};

		var setPosition = function(x, y) {
			boardPosition.x = x;
			boardPosition.y = y;
		};

		return {
			getPosition: getPosition,
			setPosition: setPosition
		};
	});
})(angular, this);

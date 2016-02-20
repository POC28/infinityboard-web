'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('UserService', function() {
		var user = {
			name: "Glenn Edberg",
			username: "Fagertveit",
			email: "gridur@gmail.com",
			rootBoard: "56c8eb49c51ba903002c0b7a"
		};

		var getRootId = function() {
			return user.rootBoard;
		};

		return {
			getRootId: getRootId
		};
	});
})(angular, this);

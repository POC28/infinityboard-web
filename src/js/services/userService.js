'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').factory('UserService', function() {
		var user = {
			name: "Glenn Edberg",
			username: "Fagertveit",
			email: "gridur@gmail.com",
			rootBoard: "56c8c224c46d8e030012563e"
		};

		var getRootId = function() {
			return user.rootBoard;
		};

		return {
			getRootId: getRootId
		};
	});
})(angular, this);

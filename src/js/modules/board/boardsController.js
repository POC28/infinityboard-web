'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardsController', [
		'$scope', 
		'$state', 
		'$stateParams', 
		'UserService', 
	function($scope, $state, $stateParams, UserService) {
		$scope.init = function() {
			$state.go('board', {id: UserService.getRootId()});
		};

		$scope.init();
	}]);
})(angular, this);

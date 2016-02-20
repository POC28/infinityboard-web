(function(angular, window, undefined) {
	angular.module('infinityBoard').controller('boardController', ['$scope', 'BoardService'] function($scope, BoardService) {
		$scope.board = 'Test board!';
	});
})(angular, this);

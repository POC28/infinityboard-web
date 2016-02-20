'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').directive('boardEntity', ['BoardService', function(BoardService) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './directives/entity/entity.template.html',
			scope: {
				entity: '='
			},
			link: function(scope, elem, attrs) {
				console.log(scope.entity);

				function init() {
					elem.css({
						width: scope.entity.size.width,
						height: scope.entity.size.height,
						left: scope.entity.pos.x,
						top: scope.entity.pos.y,
						marginLeft: -(scope.entity.size.width / 2),
						marginTop: -(scope.entity.size.height / 2),
						zIndex: BoardService.getCurrentZIndex()
					});
				}
				init();
			}
		};
	}]);
})(angular, this);

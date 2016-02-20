'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').directive('boardToolbar', ['BoardService', 'BoardControlService', function(BoardService, BoardControlService) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './directives/toolbar/toolbar.template.html',
			scope: true,
			link: function(scope, elem, attrs) {
				scope.activeMove = false;

				function init() {
					var pos = BoardControlService.getPosition();
					scope.updatePosition(pos.x, pos.y);
				}

				scope.addEntity = function() {
					scope.$parent.addEntity();
				};

				scope.goBack = function() {
					scope.$parent.goToParent();
				};

				scope.updatePosition = function(x, y) {
					elem.css({
						left: x,
						top: y
					});
				};

				elem.on('mousedown', '.toolbar-handle', function(event) {
					scope.activeMove = true;

					scope.originX = event.screenX;
					scope.originY = event.screenY;

					var currentX = event.screenX;
					var currentY = event.screenY;

					angular.element(document).on('mousemove', function(e) {
						if(e.stopPropagation) e.stopPropagation();
					    if(e.preventDefault) e.preventDefault();
					    e.cancelBubble = true;
					    e.returnValue = false;

					    if(scope.activeMove) {
					    	currentX = e.screenX;
					    	currentY = e.screenY;
					    	var pos = BoardControlService.getPosition();
					    	var posX = pos.x - (scope.originX - currentX);
					    	var posY = pos.y - (scope.originY - currentY);

					    	scope.updatePosition(posX, posY);
					    }
					});

					angular.element(document).on('mouseup', function(e) {
						if(scope.activeMove) {
							currentX = e.screenX;
					    	currentY = e.screenY;

							var pos = BoardControlService.getPosition();
					    	var posX = pos.x - (scope.originX - currentX);
					    	var posY = pos.y - (scope.originY - currentY);

					    	scope.updatePosition(posX, posY);
					    	BoardControlService.setPosition(posX, posY);

					    	scope.activeMove = false;
						}
					});
				});


				init();
			}
		};
	}]);
})(angular, this);

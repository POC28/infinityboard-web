'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').directive('boardEntity', ['$timeout', 'Board', function($timeout, Board) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './directives/entity/entity.template.html',
			scope: {
				entity: '=',
				index: '='
			},
			link: function(scope, elem, attrs) {
				scope.activeMove = false;
				scope.activeResize = false;

				function init() {
					scope.updatePosition(scope.entity.pos.x, scope.entity.pos.y);
					scope.updateSize(scope.entity.size.width, scope.entity.size.height);
					scope.updateOrder();
				}

				scope.remove = function() {
					scope.$parent.removeEntity(scope.index);
				};

				scope.edit = function() {
					scope.$parent.editEntity(scope.index);
				};

				scope.updatePosition = function(x, y) {
					elem.css({
						left: x,
						top: y
					});
				};

				scope.updateSize = function(width, height) {
					elem.css({
						width: width,
						height: height,
						marginLeft: -(width / 2),
						marginTop: -(height / 2)
					});
				};

				scope.updateOrder = function() {
					angular.element('.board-entity').css('zIndex', 1);
					elem.css('z-index', 2);
				};

				scope.updateEntity = function() {
					Board.update(scope.entity.id, scope.entity, function(data) {
			    		console.log('Board position/size updated!');
			    	}, function(error) {
			    		console.log('Failed to update board');
			    	});
				};

				elem.on('dblclick', function(event) {
					scope.$parent.openBoard(scope.entity.id);
				});

				elem.on('mousedown', function(event) {
					scope.activeMove = true;

					scope.originX = event.screenX;
					scope.originY = event.screenY;

					var currentX = event.screenX;
					var currentY = event.screenY;

					scope.updateOrder();

					angular.element(document).on('mousemove', function(e) {
						if(e.stopPropagation) e.stopPropagation();
					    if(e.preventDefault) e.preventDefault();
					    e.cancelBubble = true;
					    e.returnValue = false;

					    if(scope.activeMove) {
					    	currentX = e.screenX;
					    	currentY = e.screenY;
					    	var posX = scope.entity.pos.x - (scope.originX - currentX);
					    	var posY = scope.entity.pos.y - (scope.originY - currentY);

					    	scope.updatePosition(posX, posY);
					    }
					});

					angular.element(document).on('mouseup', function(e) {
						if(scope.activeMove) {
							currentX = e.screenX;
					    	currentY = e.screenY;

					    	scope.entity.pos.x = scope.entity.pos.x - (scope.originX - currentX);
					    	scope.entity.pos.y = scope.entity.pos.y - (scope.originY - currentY);

					    	scope.updatePosition(scope.entity.pos.x, scope.entity.pos.y);

					    	scope.activeMove = false;

					    	scope.updateEntity();
						}
					});
				});

				elem.on('mousedown', '.resize-handle', function(event) {
					if(event.stopPropagation) event.stopPropagation();
				    if(event.preventDefault) event.preventDefault();
				    event.cancelBubble = true;
				    event.returnValue = false;

				    scope.activeResize = true;

					scope.originX = event.screenX;
					scope.originY = event.screenY;

					var currentX = event.screenX;
					var currentY = event.screenY;

					angular.element(document).on('mousemove', function(e) {
						if(e.stopPropagation) e.stopPropagation();
					    if(e.preventDefault) e.preventDefault();
					    e.cancelBubble = true;
					    e.returnValue = false;

					    if(scope.activeResize) {
					    	currentX = e.screenX;
					    	currentY = e.screenY;

					    	var width = scope.entity.size.width - (scope.originX - currentX);
					    	var height = scope.entity.size.height - (scope.originY - currentY);

					    	scope.updateSize(width, height);
					    }
					});

					angular.element(document).on('mouseup', function(e) {
						if(scope.activeResize) {
							currentX = e.screenX;
					    	currentY = e.screenY;

					    	scope.entity.size.width = scope.entity.size.width - (scope.originX - currentX);
					    	scope.entity.size.height = scope.entity.size.height - (scope.originY - currentY);

					    	scope.updateSize(scope.entity.size.width, scope.entity.size.height);

					    	scope.activeResize = false;

					    	scope.updateEntity();
						}
					});
				});

				init();
			}
		};
	}]);
})(angular, this);

'use strict';

(function(angular, window, undefined) {
	angular.module('infinityBoard').directive('entityModal', ['Board', function(Board) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: './directives/entityModal/entityModal.template.html',
			scope: {
				'entity': '='
			},
			link: function(scope, elem, attrs) {
				scope.saveCurrentEntity = function() {
					$('#editModal').modal('hide');

					Board.update(scope.entity.id, scope.entity, function(data) {
						console.log('Entity saved', data);
					}, function(error) {
						console.log('Couldn\'t save entity');
					});
				};

				scope.addContent = function(type) {
					var content = {
						type: type,
						value: ''
					};

					scope.entity.content.push(content);
				};
			}
		};
	}]);
})(angular, this);

var app = angular.module('infinityBoard', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/board');
    
    $stateProvider
        .state('board', {
            url: '/board',
            templateUrl: 'modules/board/templates/board.template.html',
            controller: 'boardController'
        });
});
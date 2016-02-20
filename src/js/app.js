var app = angular.module('infinityBoard', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/board');
    
    $stateProvider
        .state('board', {
            url: '/board',
            templateUrl: 'modules/board/templates/board.template.html',
            controller: 'boardController'
        })
        .state('login', {
        	url: '/login',
        	templateUrl: 'modules/login/templates/login.template.html',
        	controller: 'loginController'
        })
        .state('register', {
        	url: '/register',
        	templateUrl: 'modules/register/templates/register.template.html',
        	controller: 'registerController'
        })
        .state('settings', {
        	url: '/settings',
        	templateUrl: 'modules/settings/templates/settings.template.html',
        	controller: 'settingsController'
        });
});
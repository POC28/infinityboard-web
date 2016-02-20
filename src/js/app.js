'use strict';

var app = angular.module('infinityBoard', ['ui.router']);

app.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.defaults.useXDomain = true;
    $urlRouterProvider.otherwise('/boards');
    
    $stateProvider
        .state('boards', {
            url: '/boards',
            templateUrl: 'modules/board/templates/boards.template.html',
            controller: 'boardsController'
        })
        .state('board', {
            url: '/board/:id',
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
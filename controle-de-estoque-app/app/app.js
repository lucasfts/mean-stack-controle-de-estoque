﻿(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('roupas', {
                url: '/roupas',
                templateUrl: 'roupas/index.html',
                controller: 'Roupas.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'roupas' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // get JWT token from server
        $.get('/app/token', function (token) {
            // add JWT token as default auth header
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            // update active tab on state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.activeTab = toState.data.activeTab;
            });
        });
    }

    $(function () {
        angular.bootstrap(document, ['app']);
    });
})();
'use strict';

/**
 * @ngdoc overview
 * @name inscripcionesApp
 * @description
 * # inscripcionesApp
 *
 * Main module of the application.
 */
angular.module('inscripcionesApp', [ 'ngRoute','firebase','bsTable'])
  .config(function ($routeProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/registro', {
        templateUrl: 'views/registro.html',
        controller: 'RegisterCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller:'DashCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

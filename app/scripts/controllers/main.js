'use strict';

/**
 * @ngdoc function
 * @name inscripcionesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inscripcionesApp
 */
angular.module('inscripcionesApp')
  .controller('MainCtrl', function ($scope, $location, CommonProp) {
    $scope.username = CommonProp.getUser();

    if (!$scope.username) {
      $location.path('/login');
    }else {
      $location.path('/dashboard')
    }
  });

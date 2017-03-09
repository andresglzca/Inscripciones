'use strict';

angular.module('inscripcionesApp')
  .controller('RegisterCtrl', function($scope, $filter, $firebaseArray, $firebaseObject, CommonProp) {


    var registros = firebase.database().ref().child("usuarios");
    $scope.registros = $firebaseArray(registros);

    $scope.restantes = function() {
      registros.on("value", function(snapshot) {
        $scope.total = snapshot.numChildren();
      })
      return $scope.total;
    };

    $scope.agregarRegistro = function() {
      var name = $scope.user.name;
      var lastname = $scope.user.lastname;
      var description = $scope.user.description;
      //var date = $scope.date;
      var staff = CommonProp.getUser();
      var date = $filter("date")(Date.now(), 'dd-MM-yyyy');
      $scope.registros.$add({
        nombre: name,
        apellido: lastname,
        fecha: date,
        staff: staff,
        descripcion: description
      });
    };

    $scope.eliminarRegistro = function(id) {
      var ref = firebase.database().ref().child("usuarios/" + id);
      $scope.registro = $firebaseObject(ref);
      var deleteRegister = $scope.registros.$getRecord(id);
      $scope.registros.$remove(deleteRegister);
    };

    angular.element('#date-mask-input').mask("00/00/0000", {placeholder: "__/__/____"});
    angular.element('#phone-mask-input').mask('(000) 000-0000', {placeholder: "(___) ___-____"});
  });

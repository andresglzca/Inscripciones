'use strict';


angular.module('inscripcionesApp')
  .controller('LoginCtrl', function($scope, $firebaseAuth, $location, CommonProp) {

    $scope.loginSubmit = function() {
      var username = $scope.user.email;
      var password = $scope.user.password;
      var auth = $firebaseAuth();

  

      auth.$signInWithEmailAndPassword(username, password).then(function() {
        var session = firebase.auth().currentUser;
        CommonProp.setSession(session.uid);
        CommonProp.setUser($scope.user.email);
        $location.path('/hola');
        console.log("pass login");

      }).catch(function(error) {
        console.log(error);
      });
    };

  })

  .service('CommonProp', ['$location', function($location) {
    var user = "";
    var session = "";
    return {
      getUser: function() {
        if (user == "") {
          user = localStorage.getItem("userEmail");
        }
        return user;
      },
      setSession: function(value) {
        localStorage.setItem("currentSession", value);
        session = value;
      },
      setUser: function (value) {
        localStorage.setItem("userEmail", value)
        user = value;
      }
    };
  }])

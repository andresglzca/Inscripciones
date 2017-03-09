'use strict';

angular.module('inscripcionesApp')
  .controller('DashCtrl', function($scope, $filter, $firebaseArray, $firebaseObject, $location, $compile, CommonProp) {

    $scope.username = CommonProp.getUser();

    if (!$scope.username) {
      $location.path('/login');
    }

    var registros = firebase.database().ref().child("usuarios");
    $scope.registros = $firebaseArray(registros);

    $scope.totalRegisters = function(snapshot) {
      registros.on("value", function(snapshot) {
        $scope.total = snapshot.numChildren();
      })
      return $scope.total;
    };


    $scope.info = function(index, row, element) {
      var info = "";
      var html = [];
      console.log("info " + row);
      angular.forEach(row, function(key, value) {
        console.log("info 2 " + key + " " + value);
        if (value == '$id') {
          info = key;
          $scope.registros.forEach(function(registro) {
            if (info == registro.$id) {
              //console.log("paso dos " + registro.descripcion);
              html.push('<p><b>' + registro.nombre + ':</b> ' + registro.descripcion + '</p>');
            }
          })
        }
        $scope.detailInfo = info;
      })
      return html.join('');
    };


    $scope.bsTableControl = {
      options: {
        data: $scope.registros,
        rowStyle: function(row, index) {
          return {
            classes: 'none'
          };
        },
        cache: false,
        striped: true,
        pagination: true,
        pageSize: 20,
        pageList: [5, 10, 25, 50, 100, 200],
        search: true,
        showColumns: true,
        showRefresh: true,
        showExport: true,
        detailView: true,
        detailFormatter: $scope.info,
        clickToSelect: true,
        showToggle: true,
        maintainSelected: true,
        columns: [{
          field: 'nombre',
          title: 'Nombre',
          align: 'center',
          valign: 'bottom',
          sortable: true
        }, {
          field: 'apellido',
          title: 'Apellido',
          align: 'center',
          valign: 'middle',
          sortable: true
        }, {
          field: 'fecha',
          title: 'Fecha',
          align: 'center',
          valign: 'middle',
          sortable: true
        }, {
          field: 'staff',
          title: 'Staff',
          align: 'center',
          valign: 'middle',
          sortable: true
        }, {
          title: 'cosa',
          align: 'center',
          valign: 'center',
          formatter: ngclick
        }]
      }
    };


    $scope.doSomething = function() { 
      var selections = angular.element("#table-user").bootstrapTable('getSelections');
      $.map(selections, function (row) {
       console.log(row.$id);
      });
    }
    function ngclick(index, row, value) {
      //console.log(index);
      // angular.forEach(row, function(key, value) {
      //     console.log("ngclick 2" + key + " "+ value);
      // })
      return '<input data-index="'+value+'" name="btSelectItem" type="checkbox"><a ng-click="$parent.doSomething()">Click</a>';
    }
  });

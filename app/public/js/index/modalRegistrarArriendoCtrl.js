 'use strict';

angular.module('App')
  .controller('modalRegistrarArriendoCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {

    var mesnumero;
    disparador();
    //cargar los datos
    function disparador() {

        var hoy = new Date();
        var mes = hoy.getMonth()+1;

        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        var f=new Date();

        mesnumero = (f.getMonth()+1);

        $scope.meses = {
            "type": "select", 
            "name": "Service",
            "value": meses[f.getMonth()], 
            "values": [ "Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] 
          };

        var aio = hoy.getFullYear();
          $scope.aios = {
            "type": "select", 
            "name": "Service",
            "value": aio, 
            "values": [aio,aio-1] 
          };
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    }


    $scope.save = function(){
      $scope.aios.value;
      $scope.meses.value;
      $scope.arriendo.cantidad;

      meses();
      var arriendo = {
        anio: $scope.aios.value,
        meses:  $scope.meses.value,
        cantidad: $scope.arriendo.cantidad,
        mesnumero:respuestameses
      };

      if ( $scope.arriendo.cantidad <= 0) {
            alertify.alert('Mensaje', 'La cantidad debe ser mayor a cero', function(){ alertify.warning('Debe de ser mayor a cero'); });
      }else{
       $http.post('/arriendo/new', arriendo).success(function (data) {
            $scope.arriendo = data;
            if (data.estado == 0) {
                alertify.success(data.mensaje);
                $uibModalInstance.close();
            }else{
                alertify.error(data.mensaje);
            }
        });
      }

    }

    var respuestameses=0;
    function meses() {
        var expr = $scope.meses.value;
       
        switch (expr) {
            case "Enero":
                respuestameses=1;
                break;
            case "Febrero":
                respuestameses=2;
                break;
            case "Marzo":
                 respuestameses=3;
                break;
            case "Abril":
                respuestameses=4;
                break;
            case "Mayo":
                respuestameses=5;
                break;
             case "Junio":
                respuestameses=6;
                break;
            case "Julio":
                respuestameses=7;
                break;
            case "Agosto":
                respuestameses=8;
                break;
             case "Septiembre":
                respuestameses=9;
                break;
             case "Octubre":
                respuestameses=10;
                break;
             case "Noviembre":
                respuestameses=11;
                break;
            case "Diciembre":
                respuestameses=12;
                break;
            default:
                respuestameses=0;
            }
    };

}]);
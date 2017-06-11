 'use strict';

angular.module('App')
  .controller('balanceComprobacionCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

    var cuentalista = [];
    var saldolista =[];
    $scope.totaldebe=0;
    $scope.totalhaber=0;
    $scope.totaldeudor=0;
    $scope.totalacreedor=0;
    function disparador() {
        $http.get('/cuenta/list').success(function (cuenta) { 

            for (var i = 0; i < cuenta.length; i++) {
                cuentalista.push({codigocuenta:cuenta[i].codigocuenta, name:cuenta[i].nombrecuenta});
                getLibroMayor(cuenta[i].codigocuenta,cuenta[i].nombrecuenta);
            } 
        });
        $scope.balance = saldolista;

    };

    function getLibroMayor(cuenta,nombre) {
     
        $http.get('/contabilidad/libromayor/'+ cuenta).success(function (data, status, headers, config) {
            $scope.mayor =  data;
            $scope.debe  =  data.debe;
            $scope.haber =  data.haber; 
            var debe=data.debe;
            var haber=data.haber;
            //controlar debe
            $scope.sumadebe=0;
            if (data.debe.length == 0) {
                 $scope.debe.push({
                    asiento:-1,
                    cantidad:0,
                    fecha:0
                 });
            }else{
                for (var i = 0; i < data.debe.length; i++) {
                    $scope.sumadebe =  $scope.sumadebe + data.debe[i].cantidad;
                    $scope.debe[i].fecha = $scope.debe[i].fecha.substring(0,10);
                }
            }

            //controlar haber
            $scope.sumahaber=0
            if (data.haber.length == 0) {
                 $scope.haber.push({
                    asiento:-1,
                    cantidad:0,
                    fecha:0
                 });
            }else{
                for (var i = 0; i < data.haber.length; i++) {
                    $scope.sumahaber =  $scope.sumahaber + data.haber[i].cantidad;
                    $scope.haber[i].fecha = $scope.haber[i].fecha.substring(0,10);
                }
            }
        //********//
                      

        $scope.totalhaber =  $scope.totalhaber+ $scope.sumahaber;
        $scope.totaldebe  =  $scope.totaldebe+ $scope.sumadebe;


        if ( $scope.sumadebe  >  $scope.sumahaber ) {
            $scope.concepto ="Deudor";
            $scope.saldo =  $scope.sumadebe  - $scope.sumahaber ;
                 /////////////////
            if (($scope.sumadebe ==0) &&($scope.sumahaber==0)) {
            }else{   

                $scope.totaldeudor=  $scope.totaldeudor + $scope.saldo;
                saldolista.push({
                    debe: $scope.sumadebe,
                    haber:$scope.sumahaber,
                    nombre:nombre,
                    codigo:cuenta,
                    deudor: $scope.saldo,
                    acreedor:0
                });
            }
            ////////////////////

        }else{
            $scope.concepto = "Acreedor";
            $scope.saldo = $scope.sumahaber  -  $scope.sumadebe ;
                /////////////////
            if (($scope.sumadebe ==0) &&($scope.sumahaber==0)) {
            }else{ 
                $scope.totalacreedor=$scope.totalacreedor+   $scope.saldo;
                saldolista.push({
                    debe: $scope.sumadebe,
                    haber:$scope.sumahaber,
                    nombre:nombre,
                    codigo:cuenta,
                    acreedor: $scope.saldo,
                    deudor:0
                });
            }
            ////////////////////
        }

        });
    };


 

	disparador();
}])

.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var factor = "1" + Array(+(places > 0 && places +1)).join("0");
        return Math.round(input * factor) / factor;
    };
})

    .filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
    };
})
    
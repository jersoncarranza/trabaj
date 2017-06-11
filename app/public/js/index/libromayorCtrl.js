 'use strict';

angular.module('App')
  .controller('libromayorCtrl', function ($scope,$http, $uibModal, $log) {
      var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
    var cuenta="caja";
    var debe;
    var haber;
    //listar estudiante
    function getLibroMayor() {
     
        $http.get('/contabilidad/libromayor/'+ cuenta).success(function (data, status, headers, config) {
            $scope.mayor =  data;
            $scope.debe  =  data.debe;
            $scope.haber =  data.haber; 
            debe=data.debe;
            haber=data.haber;
            //controlar debe
            $scope.sumadebe=0
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

        //*****//
        if ( $scope.sumadebe  >  $scope.sumahaber ) {
            $scope.concepto ="Deudor";
            $scope.saldo =  $scope.sumadebe  - $scope.sumahaber ;
        }else{
            $scope.concepto = "Acreedor";
            $scope.saldo = $scope.sumahaber  -  $scope.sumadebe ;
        }
        //********//
        });
    };


    function cargarCuenta () {
         $http.get('/cuenta/list').success(function (cuenta) { 
            $scope.colors = [];
            for (var i = 0; i < cuenta.length; i++) {
                $scope.colors.push({codigocuenta:cuenta[i].codigocuenta, name:cuenta[i].nombrecuenta});
            }
            $scope.myColor = $scope.colors[0];
            
        });
    }

    $scope.updatelist = function () {
        cuenta = $scope.myColor.codigocuenta;
        getLibroMayor();
        //acreedorOdeudor();
    };

    cargarCuenta();
    getLibroMayor();

    function acreedorOdeudor() {

        if (debe  > haber ) {
            $scope.concepto ="Deudor";
            $scope.saldo = debe  -haber ;
        }else{
            $scope.concepto = "Acreedor";
            $scope.saldo =haber  - debe ;
        }
        
    }
})
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
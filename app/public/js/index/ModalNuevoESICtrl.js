 'use strict';
angular.module('App')
  .controller('ModalNuevoESICtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {
    var existecuenta=-1;
    var bandera = -1;
    $scope.activo = [];
    $scope.pasivo = [];
    $scope.patrimonio = [];
    
    //BEGIN <ACTIVO>
    $scope.add = function () {
        if($scope.cuenta.nombre != undefined && $scope.cuenta.valor != undefined){
            if($scope.cuenta.valor > 0){
                var cuenta = $scope.cuenta;
                validarInsertar(cuenta);
               
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    }

    function resetear() {
        $scope.cuenta = "";
        $scope.cuentapasivo = "";
        $scope.cuentapatrimonio = "";
        document.getElementById("name").value = "";
        document.getElementById("numero").value = "";
        existecuenta=-1;
        bandera = -1;
    }

    function validarInsertar (cuenta) {
        $http.get('http://jaspe.herokuapp.com/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                        existecuenta = 1;
                        if ($scope.activo.length == 0) {
                             $scope.activo.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor
                            });
                           
                        }else{

                            for (var j = 0; j < $scope.activo.length; j++) {

                                if ($scope.activo[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.activo
                          
                          if (bandera != 1) {
                                 $scope.activo.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor
                                });
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarcapital();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarcapital() {
        var sumaTotalCapital = 0;
        for (var i = 0; i < $scope.activo.length; i++) {
            sumaTotalCapital = sumaTotalCapital + $scope.activo[i].cantidad;
        }
        $scope.suma = sumaTotalCapital;
    };
    //END </ACTIVO>


    //BEGIN <PASIVO>
    $scope.addpasivo = function () {
        if($scope.cuentapasivo.nombre != undefined && $scope.cuentapasivo.valor != undefined){
            if($scope.cuentapasivo.valor > 0){
                var cuentapasivo = $scope.cuentapasivo;
                validarInsertarPasivo(cuentapasivo);
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    }

    function validarInsertarPasivo (cuenta) {
        $http.get('http://jaspe.herokuapp.com/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                        existecuenta = 1;
                        if ($scope.pasivo.length == 0) {
                             $scope.pasivo.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor
                            });
                           
                        }else{

                            for (var j = 0; j < $scope.pasivo.length; j++) {

                                if ($scope.pasivo[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.pasivo
                          
                          if (bandera != 1) {
                                 $scope.pasivo.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor
                                });
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarPasivo();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarPasivo() {
        var sumarTotalPasivo = 0;
        for (var i = 0; i < $scope.pasivo.length; i++) {
            sumarTotalPasivo = sumarTotalPasivo + $scope.pasivo[i].cantidad;
        }
        $scope.sumapasivo = sumarTotalPasivo;
    };
    //END </PASIVO>

    //<PATRIMONIO>
    $scope.addpatrimonio = function () {
        if($scope.cuentapatrimonio.nombre != undefined && $scope.cuentapatrimonio.valor != undefined){
            if($scope.cuentapatrimonio.valor > 0){
                var cuentapatrimonio = $scope.cuentapatrimonio;
                validarInsertarPatrimonio(cuentapatrimonio);
            }else{
                alertify.notify("Ingrese un número mayor a cero");
            }
        }
        else{
            alertify.notify("llene todos los datos");
        } 
    };

    function validarInsertarPatrimonio (cuenta) {
        $http.get('http://jaspe.herokuapp.com/cuenta/list').success(function (datos) {
            $scope.datos = datos;
            if (datos != null) {

                for (var i = 0; i < datos.length; i++) { 
                    if (datos[i].nombrecuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                        
                      
                        existecuenta = 1;
                        if ($scope.patrimonio.length == 0) {
                            $scope.patrimonio.push({
                                cuenta:cuenta.nombre.toLowerCase(),
                                cantidad:cuenta.valor
                            });
                           
                        }else{

                            for (var j = 0; j < $scope.patrimonio.length; j++) {

                                if ($scope.patrimonio[j].cuenta.toLowerCase() == cuenta.nombre.toLowerCase()) {
                                    bandera = 1;
                                }

                            }//FOR $scope.patrimonio
                          
                          if (bandera != 1) {
                                $scope.patrimonio.push({
                                    cuenta:cuenta.nombre.toLowerCase(),
                                    cantidad:cuenta.valor
                                });
                            }

                        }//ELSE
                    }
                }//FOR API REST

                if (existecuenta == -1) {
                    alertify.error("No existe esa cuenta, no se inserto");
                }else{
                    if (bandera == 1 ) {
                        alertify.error("Esta cuenta ya esta en el Estado de Situación Inicial ");
                    }else{
                        alertify.success("Ingreso con exito");
                        sumarPatrimonio();
                        resetear();
                    }
                }

            }else{
                alertify.notify("conectese a internet");
            }
        });
    };

    function sumarPatrimonio() {
        var sumarTotalPatrimonio = 0;
        for (var i = 0; i < $scope.patrimonio.length; i++) {
            sumarTotalPatrimonio = sumarTotalPatrimonio + $scope.patrimonio[i].cantidad;
        }
        $scope.sumapatrimonio = sumarTotalPatrimonio;
        color();
    };
    //END<PATRIMONIO>
    function color() { 
        if (($scope.sumapatrimonio + $scope.sumapasivo) == $scope.suma) {
            document.getElementById("color").style.borderColor  = "green";
        }else{
            document.getElementById("color").style.borderColor  = "red";
        }
    };

    //
    var aux = 0;
    $scope.guardar = function () {
        var aux = $scope.sumapatrimonio + $scope.sumapasivo;
         if ((aux) == $scope.suma) {
            console.log("$scope.activo",$scope.activo);
            console.log("$scope.pasivo",$scope.pasivo);
            console.log("$scope.patrimonio",$scope.patrimonio);
        }else{
            alertify.error("Algo esta mal revise");
        }
    };
}]);
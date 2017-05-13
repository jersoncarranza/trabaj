 'use strict';

angular.module('App')
  .controller('modalEditarMaterialCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {

    
    disparador();
    //cargar los datos
    function disparador() {
        var id = localStorage.getItem("id");
        $http.get('/material/listar/'+id).success(function(data) {
            $scope.articulo = data;
            $scope.articulo.ncantidad = 0;
           // $scope.articulo $scope.articulo.cantidad  =
        });

        $http.get('/cuenta/list').success(function (cursos) {    
            $scope.colors = [];

            for (var i = 0; i < cursos.length; i++) {

                if ((cursos[i].codigocuenta == "1.1.1.1") || (cursos[i].codigocuenta == "1.1.2.2") || (cursos[i].codigocuenta == "2.1.1.1") || (cursos[i].codigocuenta == "2.1.1.2") || (cursos[i].codigocuenta == "2.1.1.2.3")  ) {
                    $scope.colors.push({name:cursos[i].nombrecuenta, id:cursos[i].codigocuenta});
                }
            }
            $scope.myColor = $scope.colors[0];
        });//<
    };

    var bandera = 0;
    $scope.editar = function () {
        validacion();
        if (bandera==0) {
            var id = localStorage.getItem("id");
            $scope.articulo.pago = $scope.myColor;
             console.log("$scope.myColor",$scope.myColor);
            $scope.articulo.cantidad = $scope.articulo.cantidad +  $scope.articulo.ncantidad;

            if ($scope.articulo.ncantidad * $scope.articulo.costo > 0) {
                $http.get('/contabilidad/libromayor/' + $scope.myColor.id).success(function (resultado) {
                    console.log("gana",resultado);
                    var sumadebe=0;
                    var sumahaber=0;

                    for (var i = 0; i < resultado.debe.length; i++) {
                        sumadebe = sumadebe +resultado.debe[i].cantidad;
                    }
                    for (var j = 0; j < resultado.haber.length; j++) {
                        sumahaber = sumahaber + resultado.haber[j].cantidad;
                    }

                    var saldo = sumadebe - sumahaber;
                    var gasto = $scope.articulo.ncantidad * $scope.articulo.costo;
                    

                    if (saldo >= gasto ) {
                       $http.put('/material/editar/'+id, $scope.articulo).success(function(data) {
                            $scope.respuesta = data;   
                            if (data.nModified == 1) {
                                alertify.success("Correctamente actualizado");
                                $uibModalInstance.close();
                            }else{
                                alertify.warning("Ya esta actualizado");
                            }
                        });

                    }else{
                        if (($scope.myColor.name =="caja") || ($scope.myColor.name =="bancos")) {   
                            alertify.alert("Mensaje","No tiene fondos en "+$scope.myColor.name+" , su saldo es: $"+saldo, function(){
                                alertify.message('OK');
                            });
                        }else{
                            $http.put('/material/editar/'+id, $scope.articulo).success(function(data) {
                                $scope.respuesta = data;   
                                if (data.nModified == 1) {
                                    alertify.success("Correctamente actualizado");
                                    $uibModalInstance.close();
                                }else{
                                    alertify.warning("Ya esta actualizado");
                                }
                            });
                        }

                    }
                    
                });
            }else{
                $http.put('/material/editar/'+id, $scope.articulo).success(function(data) {
                    $scope.respuesta = data;   
                    if (data.nModified == 1) {
                        alertify.success("Correctamente actualizado");
                        $uibModalInstance.close();
                    }else{
                        alertify.warning("Ya esta actualizado");
                    }
                });
            }
            //
        }
    };

    function validacion() {
         if ($scope.articulo.ncantidad < 0) {
            document.getElementById("ncantidad").focus();
            alertify.confirm('la cantidad que adquirió debe ser mayor a cero').set('basic', true);
            bandera = 1;
        }

        if ($scope.articulo.costo <= 0) {
            document.getElementById("costo").focus();
            alertify.confirm('El costo debe ser mayor a cero').set('basic', true);
            bandera = 1;

        }
        if ($scope.articulo.precio < $scope.articulo.costo ) {
            document.getElementById("precio").focus();
            alertify.confirm('El precio debe ser mayor al costo').set('basic', true);
            bandera = 1;
        } 

        if (($scope.articulo.ncantidad > 0) &&  ($scope.articulo.costo > 0) && ($scope.articulo.precio >= $scope.articulo.costo )) {
            bandera = 0;
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    }

}]);
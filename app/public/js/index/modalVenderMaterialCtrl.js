 'use strict';

angular.module('App')
  .controller('modalVenderMaterialCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {

    
    disparador();
    //cargar los datos
    function disparador() {
        var id = localStorage.getItem("idvender");

        $http.get('/material/listar/'+id).success(function(data) {
            $scope.articulo = data;
            console.log(data);
            $scope.articulo.cantidadcomprar = 0;
           // $scope.articulo $scope.articulo.cantidad  =
        });

    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    };

    //proceder a vender material o mercaderia
    $scope.vender = function () {
    	let bandera=0;
    	if ($scope.articulo.cantidadcomprar <= 0) {
    		bandera=1;
    		alertify.alert("Mensaje","Mínimo una unidad debe de poner", function(){
                alertify.warning('Mínimo una unidad');
            });
    	}

    	if ($scope.articulo.cantidadcomprar > $scope.articulo.cantidad) {
    		bandera=1;
    		alertify.alert("Mensaje","En stop solo existe "+$scope.articulo.cantidad+ " unidades", function(){
                alertify.warning("solo existe "+$scope.articulo.cantidad +" "+ $scope.articulo.nombre);
            });
    	}
    	
    	if (($scope.articulo.cantidadcomprar > 0)&&($scope.articulo.cantidadcomprar <= $scope.articulo.cantidad)) {
    		bandera=0;
    	}

    	if (bandera == 0) {
    		console.log("$scope.articulo",$scope.articulo);
    		$http.put('/material/venta/'+$scope.articulo._id, $scope.articulo).success(function(data) {
				 if (data.nModified == 1) {
                    alertify.success("Venta exitosa");
                    $uibModalInstance.close();
                }else{
                    alertify.warning("Error intentelo mas tarde");
                }
            });
    	}

    };

}]);
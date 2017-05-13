 'use strict';

angular.module('App')
  .controller('modalNewMaterialCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {

 	
	function disparador () {
	};
	disparador();

    var bandera = 0;
    $scope.save = function () {

        if ($scope.articulo.costo <= 0) {
            document.getElementById("costo").focus();
            alertify.confirm('El costo debe ser mayor a cero').set('basic', true);
            bandera = 1;

        }
        if ($scope.articulo.precio < $scope.articulo.costo ) {
            document.getElementById("precio").focus();
            alertify.confirm('El precio no debe ser mayor al costo').set('basic', true);
            bandera = 1;
        } 

        //console.log("$scope.articulo",$scope.articulo);
        
        if (bandera == 0) {
            $http.post('/material/guardar/', $scope.articulo).success(function(data) {

                if (data.estado == 0) {
                    alertify.success(data.mensaje);
                    $uibModalInstance.close();
                }else{
                    alertify.error(data.mensaje);
                }
            });
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.close();
    }

}]);
 'use strict';

angular.module('App')
  .controller('modalEditarCuentaCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

		

    getIdCuenta();
    //listar los datos de un estudiante
    function getIdCuenta() {
        var id = localStorage.getItem("id");
        $http.get('/cuenta/list/'+ id).success(function (data ) {
            $scope.cuenta = data;
            console.log("scope cuenta", $scope.cuenta);
        });
    };

    //boton actualizar estudiante
    $scope.update = function(){
        console.log("datos actualizar", $scope.cuenta);
        console.log("datos actualizar", $scope.cuenta._id);
        
        $http.delete('/cuenta/eliminar/'+ $scope.cuenta._id).success(function (res) {
            
            if(res.estado == 1){

                    $http.put('/cuenta/editar/' + $scope.cuenta._id, $scope.cuenta).success(function(data) {
                        if (data.estado == 0) {
                            alertify.success(data.mensaje);
                            $uibModalInstance.close();
                        }else{
                            alertify.error(data.mensaje);
                        }
                    });
            }else{
                $http.post('/cuenta/register', $scope.cuenta).success(function (data) {  
                    if (data.estado == 0) {
                        alertify.success(data.mensaje);
                        $uibModalInstance.close();
                    }else{
                        alertify.error(data.mensaje);
                    }
                });
            }
        });
            
    };

    //boton cancelar
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
        alertify.notify("Se canceló");
	};



}]);


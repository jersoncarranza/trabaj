 'use strict';

angular.module('App')
  .controller('cuentaCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

 	
	function codigoCuentas () {
		$http.get('/cuenta/list').success(function (data) {
			$scope.cuenta = data;
			if (data == null) {
				alertify.error(data.mensaje);
			}
		});
	};


	codigoCuentas();


	
	$scope.openeditar = function (data) {

    	localStorage.setItem("id", data._id);
    	localStorage.setItem("nombrecuenta", data.nombrecuenta);
    	localStorage.setItem("codigocuenta", data.codigocuenta);



    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalEditarCuentaEstudiante.html',
        	controller: "modalEditarCuentaCtrl",
        	size: "sm",
    	});

        modalInstance.result.then(function () {
        	codigoCuentas();	
        });
	};

	$scope.opencuenta = function () {
    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalopenCuenta.html',
        	controller: "modalopenCuentaCtrl",
        	size: "sm",
    	});

        modalInstance.result.then(function () {
        	codigoCuentas();	
        });
	};

}]);



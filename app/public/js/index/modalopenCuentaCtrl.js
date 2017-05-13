 'use strict';

angular.module('App')
  .controller('modalopenCuentaCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {

 	$scope.save = function () {
		var datos = $scope.dato;
		$http.post('/cuenta/register', datos).success(function (data) {
			console.log(data);
			if (data.estado == 0) {
				alertify.success(data.mensaje);
				$uibModalInstance.close();
			}else{
				alertify.error(data.mensaje);
			}
		});
	};

	$scope.cancel = function () {
		$uibModalInstance.close();
	};

}]);



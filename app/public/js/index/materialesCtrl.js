 'use strict';

angular.module('App')
  .controller('materialesCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

 	
	function getAllMaterial () {
         $http.get('/material/listar/').success(function(data) {
            $scope.materiales = data;
        });
	};
	getAllMaterial();

    //ventana modal añadir nuevo material de venta
    $scope.openmateriales = function () {
        var size= 'lg';
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalNewMaterial.html',
        controller: "modalNewMaterialCtrl",
        size: size
        });
        
        modalInstance.result.then(function () {
            getAllMaterial();
        });

    };
    //actualizar
    $scope.refresh = function () {
        getAllMaterial();
    }
    //ventana modal modificar
    $scope.openEditar = function (m) {
  
        localStorage.setItem("id", m._id);
        var size= 'lg';
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalEditarMaterial.html',
        controller: "modalEditarMaterialCtrl",
        size: size
        });
        
        modalInstance.result.then(function () {
            getAllMaterial();
        });
    };
    //ventana vende´r
    $scope.vender = function (m) {
        console.log(m._id);
        localStorage.setItem("idvender", m._id);
        var size= 'lg';
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalVenderMaterial.html',
        controller: "modalVenderMaterialCtrl",
        size: size
        });
        
        modalInstance.result.then(function () {
            getAllMaterial();
        });
    };

}]);
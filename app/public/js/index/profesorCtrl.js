 'use strict';

angular.module('App')
  .controller('profesorCtrl', function ($scope,$http, $uibModal, $log) {

		var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
	
	GetAllTeacher();

	function GetAllTeacher() {
		$http.get('/profesor/listTeacher').success(function (data, status, headers, config) {
			$scope.profesor = data;

		})
		.error(function (data, status, header, config) {
			$scope.ResponseDetails = "Data: " + data +
				"<br />status: " + status +
				"<br />headers: " + jsonFilter(header) +
				"<br />config: " + jsonFilter(config);
		});
	};


	$scope.formVisibility=false;
	$scope.ShowForm = function () {
		$scope.formVisibility=true;
	};

	$scope.animationsEnabled = true;
	var size= 'md';
	//modal añadir persona 
	$scope.open = function () {
		var modalInstance = $uibModal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/index/modalprofesor.html',
		controller: "ModalProCtrl",
		size: size,
		});

		modalInstance.result.then(function () {
		GetAllTeacher();
		});

	};

	//actualizar
	$scope.refresh= function (argument) {
 		GetAllTeacher();
	};

	//ventana modal rol de pagos
	$scope.openrol = function (data) {
    	var size= 'lg';
    	
    	var id =  data.id;
    	if (typeof(Storage) !== "undefined") {
    		localStorage.setItem("id_rol", id);
    		var aux_rol = localStorage.getItem("id_rol");
		}


    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalrolpagos.html',
        	controller: "ModalrolpagosCtrl",
        	size: size,
    	});

        modalInstance.result.then(function () {
        	GetAllTeacher();	
        });
	};
	//ventana modal rol de pagos
	$scope.openedit = function (data) {
    	var size= 'md';
    	
    	var id =  data.id;
    	if (typeof(Storage) !== "undefined") {
    		localStorage.setItem("id_pro", id);
    		var aux_id = localStorage.getItem("id_pro");
		}


    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modaleditarprofesor.html',
        	controller: "ModalEditarProfesorCtrl",
        	size: size,
    	});

        modalInstance.result.then(function () {
        	GetAllTeacher();	
        });
	};
	    //=========Ventana modal para ver los pagos
    $scope.pagos = function (cedula) {

        localStorage.setItem("cedularol",  cedula); 
        var size= 'lg';
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalListaRolesPagos.html',
        controller: "modalListaRolesPagosCtrl",
        size: size
        });
    };

	//Eliminar un profesor.

  	$scope.remove = function (data) {
  		var id = data.id;
  		var cedula = data.cedula;
		alertify.prompt("Eliminar Profesor","Ingrese la cédula del profesor para eliminar.", "",
		function(evt, value ){
			console.log(value, cedula);
			if (value === cedula) {
				$http.delete('/profesor/removeTeacher/' +id).success(function (data) {
				GetAllTeacher();
					if (data.estado == 0 ) {
						alertify.success(data.mensaje + value );
					}else{
						alertify.notify(data.mensaje)
					}
				});
			 }else{
			 	alertify.notify("Ingreso erroneo de la cédula");
			 }
			},function(){
		    alertify.notify('Se canceló');
		});
  	};


  });

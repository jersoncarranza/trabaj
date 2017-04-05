 'use strict';
angular.module('App')
  .controller('estudianteCtrl', function ($scope,$http, $uibModal, $log) {

		var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
	
	

	$scope.animationsEnabled = true;
	var size= 'lg';

	//actualizar
	$scope.Save = function() {
	  $scope.estudiante = estudiante;
	  console.log("datos", $scope.estudiante );	  
	};

	//ventana modal estudiante

	$scope.open = function (data) {
    	var size= 'md';
    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalestudiante.html',
        	controller: "ModalEstudianteCtrl",
        	size: size,
    	});
	};

	$scope.mycurso = function (argument) {
		console.log("Heyy");
	}

 

	//	
	$scope.updatelist = function () {
		var curso = $scope.myColor;
		
		if (curso.id != 0) {
			 $http.get('/estudiante/listcursos/' + curso.id ).success(function (datos2) {
			 	$scope.estudiante = datos2;
			 });
		}else{
			GetAllEstudiante();
		}
	}
	

		//listar estudiante
	function GetAllEstudiante() {
	        $http.get('/estudiante/list').success(function (data, status, headers, config) {
	            $scope.estudiante = data;
	            $scope.colors = [
			      {name:"curso", id:"0"}
			    ];
	            $http.get('curso/getall').success(function (cursos) {	
	            	for (var i = 0; i < cursos.length; i++) {

					  	$scope.colors.push({name:cursos[i].nombre, id:cursos[i]._id});
	            	}
					$scope.myColor = $scope.colors[0];
	            });//<

	        })
	        .error(function (data, status, header, config) {
	            $scope.ResponseDetails = "Data: " + data +
	                "<br />status: " + status +
	                "<br />headers: " + jsonFilter(header) +
	                "<br />config: " + jsonFilter(config);
	        });
	    };
	 GetAllEstudiante();



	 //elimnar un estudiante
	$scope.remove = function (data) {
		var id = data.id;
		var cedula = data.cedula;

		alertify.prompt("Ingrese la cédula del estudiante para eliminar.", "",
		function(evt, value ){
			console.log(value, cedula);
			if (value === cedula) {
				$http.delete('/estudiante/remove/' +id).success(function (data) {
				GetAllEstudiante();
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


	//editar un estudiante
		$scope.openedit = function (data) {
    	var size= 'md';
    	
    	var id =  data.id;
    	if (typeof(Storage) !== "undefined") {
    		localStorage.setItem("id_estudiante", id);
    		var aux_id = localStorage.getItem("id_estudiante");
		}


    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalEditarEstudiante.html',
        	controller: "ModalEditarEstudianteCtrl",
        	size: size,
    	});

        modalInstance.result.then(function () {
        	GetAllEstudiante();	
        });
	};

	//actualizar
	$scope.refresh = function () {
		 GetAllEstudiante();
	}


});

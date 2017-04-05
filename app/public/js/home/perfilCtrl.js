 'use strict';

angular.module('AppHome')
  .controller('perfilCtrl', ['$scope', '$http', '$uibModal', '$log', function ($scope,$http, $uibModal, $log) {

  	var id = localStorage.getItem("cedula_estudiante");
	var j;
	var k;
  	
  	function GetAllPerfil() {

	 	$http.get('/estudiante/listcedula/'+ id ).success(function (data, status, headers, config) {
		 	$scope.datos = data;

		 	$scope.datos2 = data;
		 	$scope.datos2.curso =  [];

		 	$scope.datos3 = data;
		 	$scope.datos3.curso2 =  [];

		 	j = -1;
		 	k = -1;

		 	for (var i = 0; i < data.cursos.length; i++) {

				if (data.cursos[i].estado === "0") { 
					j=j+1;
					$scope.datos2.curso[j] = data.cursos[i];
				}

				if (data.cursos[i].estado === "1") {
					k=k+1;
					$scope.datos3.curso2[k] = data.cursos[i];
				}
		 	};//<for

	
	 	 })
	  	.error(function (data, status, header, config) {
		  $scope.ResponseDetails = "Data: " + data +
			  "<br />status: " + status +
			  "<br />headers: " + jsonFilter(header) +
			  "<br />config: " + jsonFilter(config);
		});
  	};
	GetAllPerfil();

	//vaciar LocalStorage reemplaza a SessionStorage 
	$scope.vaciar = function() {    
        localStorage.removeItem('estudiante');
        localStorage.removeItem('cedula_estudiante');
        localStorage.removeItem('contrasena_estudiante');
        localStorage.removeItem('nombres_estudiante');
        localStorage.removeItem('apellido1_estudiante');
        localStorage.removeItem('apellido2_estudiante');
        localStorage.removeItem('sexo_estudiante');
    };


    //remove
    $scope.remove = function (c, datos) {
    	var id = c.id_curso;
    	$scope.datos = datos;
    	$http.put('/estudiante/removecurso/'+ id, $scope.datos ).success(function (data, status, headers, config) {
		 	//$scope.datos = data;
		 	GetAllPerfil();
	 	 })
	  	.error(function (data, status, header, config) {
		  $scope.ResponseDetails = "Data: " + data +
			  "<br />status: " + status +
			  "<br />headers: " + jsonFilter(header) +
			  "<br />config: " + jsonFilter(config);
		})

    };

  }]);
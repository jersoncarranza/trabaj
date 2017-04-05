 'use strict';

angular.module('AppHome')
  .controller('datosCtrl', ['$scope', '$http', '$uibModal', '$log', function ($scope,$http, $uibModal, $log) {

  	var cedula = localStorage.getItem("cedula_estudiante");
  	var id;


  	function Disparador() {
  			$http.get('/estudiante/listcedula/'+ cedula ).success(function (data, status, headers, config) {
		 	$scope.estudiante = data;
		 	id = data.id;
		 	if(data.sexo == "Mujer"){
                document.getElementById('radio2').checked = true;
            }

            if(data.sexo == "Hombre"){    
                document.getElementById('radio3').checked = true;
            }
	 	 })
	  	.error(function (data, status, header, config) {
		  $scope.ResponseDetails = "Data: " + data +
			  "<br />status: " + status +
			  "<br />headers: " + jsonFilter(header) +
			  "<br />config: " + jsonFilter(config);
		});
  	};

	Disparador();


	 //boton actualizar estudiante
    $scope.update = function(){
    	localStorage.setItem("nombres_estudiante", $scope.estudiante.nombres);
		localStorage.setItem("apellido1_estudiante", $scope.estudiante.apellido1);
		localStorage.setItem("apellido2_estudiante", $scope.estudiante.apellido2);
        var sexo = radiobuton();
        $scope.estudiante.sexo = sexo;
        $http.put('/estudiante/update/' + id, $scope.estudiante).success(function(data) {
            
            if (data.estado == 0) {
                alertify.success(data.mensaje);
            }else{
                alertify.error(data.mensaje);
            }
        });
    };

    //radio button sexo
    function radiobuton(){
        var sexo;
        if (document.getElementById("radio2").checked == true){
            sexo = "Mujer";
        } 
        
        if (document.getElementById("radio3").checked == true){
            sexo = "Hombre";
        }
        return sexo;
    }





  }]);
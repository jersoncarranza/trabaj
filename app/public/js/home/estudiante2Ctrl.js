 'use strict';
//VISTA DE USUARIO
angular.module('AppHome')
  .controller('estudiante2Ctrl',['$scope','$http', '$uibModalInstance', '$log','$uibModal', function ($scope,$http, $uibModalInstance, $log, $uibModal) {
    
    $scope.vaciar = function() {
        
        localStorage.removeItem('cedula_estudiante');
        localStorage.removeItem('contrasena_estudiante');
        localStorage.removeItem('nombres_estudiante');
        localStorage.removeItem('apellido1_estudiante');
        localStorage.removeItem('apellido2_estudiante');
        localStorage.removeItem('sexo_estudiante');

        $uibModalInstance.close();
        var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/home/estudianteopcion1.html',
                controller: "estudianteCtrl",
                size: 'md',
        });
    }

	function Save () {

		var idcurso = localStorage.getItem("id_curso");
        var nombre = localStorage.getItem("nombre_curso");
        
        $scope.nombre = localStorage.getItem("nombre_curso");
        $scope.precio = localStorage.getItem("precio_curso");
        $scope.estudiante = localStorage.getItem("nombres_estudiante");

        //console.log("id",idcurso);
        //console.log("nombre curso",nombre);
        //console.log("$scope.estudiante",$scope.estudiante);

       
	};
	
    Save();

	//login si

    $scope.si = function () {
        var id_curso = localStorage.getItem("id_curso");
        var nombre_curso = localStorage.getItem("nombre_curso");
        var precio_curso = localStorage.getItem("precio_curso");
       // console.log("precio",precio_curso);

        var contrasena = localStorage.getItem("contrasena_estudiante");
        var cedula = localStorage.getItem("cedula_estudiante");
         

        var estudiante = {
            cedula2:cedula,
            contrasena2:contrasena,
            cursos:{
                id_curso:id_curso,
                nombre_curso: nombre_curso,
                precio_curso:precio_curso
            }
        }

        $scope.auxiliar = estudiante
       // console.log("$scope.auxiliar", $scope.auxiliar);

   
            
            $http.post('/estudiante/login', $scope.auxiliar).success(function(data) {
                if (data.estado === 0) {
                    
                    if (data.curso === 0) {
                        alertify.success("curso agregado correctamente");
                    }
                    if(data.curso === 1){
                        alertify.notify("Este curso ya lo eligio");
                    }
                $uibModalInstance.close();                
                }else{
                    if(data.estado === 1){
                        alertify.notify(data.mensaje);
                    }else{
                        alertify.notify(data.mensaje);
                
                    }
                }
            });
        
    };

    ///


    $scope.no = function () {
         $uibModalInstance.close();
    }

  }]);

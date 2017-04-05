 'use strict';

angular.module('App')
  .controller('ModalEditarEstudianteCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

		
    var id = localStorage.getItem("id_estudiante");
    GetIdEstudiante();
    //listar los datos de un estudiante
    function GetIdEstudiante() {
        $http.get('/estudiante/list/'+ id).success(function (data, status, headers, config) {
            $scope.estudiante = data;
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

    //boton actualizar estudiante
    $scope.update = function(){
        var sexo = radiobuton();
        $scope.estudiante.sexo = sexo;
        $http.put('/estudiante/update/' + $scope.estudiante.id, $scope.estudiante).success(function(data) {
            
            if (data.estado == 0) {
                alertify.success(data.mensaje);
                $uibModalInstance.close();
            }else{
                alertify.error(data.mensaje);
            }
        });
         $uibModalInstance.close();
    };

    //boton cancelar
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
        alertify.notify("Se canceló");
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


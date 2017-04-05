 'use strict';

angular.module('App')
  .controller('ModalEditarProfesorCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

		
    var id = localStorage.getItem("id_pro");
    GetIdProfesor();
    //listar los datos de un profesor
    function GetIdProfesor() {
        $http.get('/profesor/list/'+ id).success(function (data, status, headers, config) {
            $scope.profesor = data;
            $scope.placement = {
            options: [
            'Profesor',
            'Secretaria'
            ],
            selected: data.cargo
        };
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };
    //boton actualizar
    $scope.update = function(data){

        var cedula = data.cedula;
        var validate = check_cedula(cedula);

        if(validate === true){
            $http.put('/profesor/updateTeacher/' + $scope.profesor.id, $scope.profesor).success(function(data) {
            $scope.profesor = data;
            if (data.estado == 0) {
                alertify.success(data.mensaje);
                $uibModalInstance.close();
            }else{
                alertify.error(data.mensaje);
            } 
          });
            
        }


    };
    //boton cancelar
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
        alertify.notify("Se canceló");
	};


        //función validar cedula
  function check_cedula( cedula_aux )
    {
      var cedula = cedula_aux;
      var array = cedula.split( "" );
      var num = array.length;
      if ( num == 10 )
      {
        var total = 0;
        var digito = (array[9]*1);
        for( var i=0; i < (num-1); i++ )
        {
          var mult = 0;
          if ( ( i%2 ) != 0 ) {
            total = total + ( array[i] * 1 );
          }
          else
          {
            mult = array[i] * 2;
            if ( mult > 9 )
              total = total + ( mult - 9 );
            else
              total = total + mult;
          }
        }
        var decena = total / 10;
        decena = Math.floor( decena );
        decena = ( decena + 1 ) * 10;
        var final = ( decena - total );
        if ( ( final == 10 && digito == 0 ) || ( final == digito ) ) {
          // alert( "La c\xe9dula ES v\xe1lida!!!" );
          return true;
        }
        else
        {
          alertify.error('La c\xe9dula no es v\xe1lida');
          return false;
        }
      }
      else
      {
        alertify.warning("Debe de tener 10 dígitos la cédula");
        return false;
      }
    }
    /**/

}]);


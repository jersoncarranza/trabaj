 'use strict';

angular.module('App')
	.controller('ModalEstudianteCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

		
	 
		//Guardar
		$scope.Save = function() {
			
			$scope.estudiante.sexo = sexo;
			var cedula = $scope.estudiante.cedula;
			$scope.estudiante.auxiliar = $scope.estudiante.cedula;
			var validatecedula = check_cedula(cedula);
			
			if(validatecedula === true){
					$http.post('/estudiante/register', $scope.estudiante ).success(function(data) {
							if (data.estado === 0) {
								alertify.success(data.mensaje);
							}else{
								if(data.estado === 2){
									alertify.notify(data.mensaje);
								}else{
									alertify.notify(data.mensaje);
								}
							}
					});
			 $uibModalInstance.close();
			}
				
			 // document.getElementById({{$scope.contact.id}}).style.display = 'none';	
		};
		
		//boton cancelar
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

		//radio buton
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
					// alertify.success('Ingresado correctamenta correctamenta');
					//alert( "La c\xe9dula es coorecta" );
					return true;
				}
				else
				{
					alertify.warning('La c\xe9dula no es v\xe1lida');
					//alert( "La c\xe9dula NO es v\xe1lida!!!" );
					return false;
				}
			}
			else
			{
				//alert( "La c\xe9dula debe tener 10 digitos!!!" );
				alertify.warning("Debe de tener 10 dígitos la cédula");
				return false;
			}
		}
		
}]);


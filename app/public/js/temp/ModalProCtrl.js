 'use strict';

angular.module('App')
  .controller('ModalProCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

	var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
	


	$scope.placement = {
		options: [
		  'Profesor',
		  'Secretaria'
		],
		selected: 'Profesor'
	};

	$scope.Save=function () {
		var data = $scope.NewPro;
		var cedula = $scope.NewPro.cedula;
		var validate = check_cedula(cedula);
			if (validate === true) {
			  console.log('paso por aqui');
			  $http.post('/profesor/register', data).success(function (data) {
						  $scope.profesor = data;
					  })
			  .error(function (data, status, header, config) {
					$scope.ResponseDetails = "Data: " + data +
					"<hr />status: " + status +
					"<hr />headers: " + header +
					"<hr />config: " + config;
				});
				$uibModalInstance.close($scope.listar);
			}
	};

	$scope.cancel = function () {
	  $uibModalInstance.dismiss('cancel');
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
		  alert( "La c\xe9dula ES v\xe1lida!!!" );
		  return true;
		}
		else
		{
		  alert( "La c\xe9dula NO es v\xe1lida!!!" );
		  return false;
		}
	  }
	  else
	  {
		alert("La c\xe9dula no puede tener menos de 10 d\xedgitos");
		return false;
	  }
	}

}]);
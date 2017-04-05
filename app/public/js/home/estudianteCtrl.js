 'use strict';
//VISTA DE USUARIO
angular.module('AppHome')
  .controller('estudianteCtrl',['$scope','$http', '$uibModalInstance', '$log', function ($scope,$http, $uibModalInstance, $log) {

	$scope.Register = function () {

		var id_curso = localStorage.getItem("id_curso");
		var precio_curso = localStorage.getItem("precio_curso");
		var nombre_curso = localStorage.getItem("nombre_curso");
		var sexo = radiobuton();

		$scope.estudiante.cursos = {};
		$scope.estudiante.cursos.id_curso=id_curso;
		$scope.estudiante.cursos.nombre_curso=nombre_curso;
		$scope.estudiante.cursos.precio_curso=precio_curso;

        $scope.estudiante.sexo = sexo;
        $scope.estudiante.auxiliar =  $scope.estudiante.contrasena_r;
		
		//console.log($scope.estudiante);

		var cedula =  $scope.estudiante.cedula;
		var validatecedula = check_cedula(cedula);

		if (validatecedula === true) {
			$http.post('/estudiante/register', $scope.estudiante ).success(function(data) {
				if (data.estado === 0) {
					alertify.success("Gracias por hacer la prematricúla");
					
					localStorage.setItem("estudiante",  JSON.stringify($scope.estudiante));//lenamos la bandera
					
					localStorage.setItem("cedula_estudiante", $scope.estudiante.cedula);
					localStorage.setItem("contrasena_estudiante", $scope.estudiante.contrasena_r);
					localStorage.setItem("nombres_estudiante", $scope.estudiante.nombres);
					localStorage.setItem("apellido1_estudiante", $scope.estudiante.apellido1);
					localStorage.setItem("apellido2_estudiante", $scope.estudiante.apellido2);
					localStorage.setItem("sexo_estudiante", $scope.estudiante.sexo);

/*					console.log(localStorage.getItem("cedula_estudiante"));
					console.log(localStorage.getItem("contrasena_estudiante"));
					console.log(localStorage.getItem("nombres_estudiante"));
					console.log(localStorage.getItem("apellido1_estudiante"));
					console.log(localStorage.getItem("apellido2_estudiante"));
					console.log(localStorage.getItem("sexo_estudiante"));*/
					div = document.getElementById('perfil');
        			div.style.display = 'block';
					$uibModalInstance.close();
					
				}else{
					if(data.estado === 2){
						alertify.notify("Ya estas registrado inicia sesión");
					}else{
						alertify.notify(data.mensaje);
					}
				}
			});	
		}
	};

	//login
	$scope.Login = function () {
		var cedula = $scope.estudiante2.cedula2;
		var contrasena = $scope.estudiante2.contrasena2;
		var validatecedula = check_cedula(cedula);

		var id_curso = localStorage.getItem("id_curso");
		var nombre_curso = localStorage.getItem("nombre_curso");
		var precio_curso = localStorage.getItem("precio_curso");
		
		$scope.estudiante2.cursos = {};
		$scope.estudiante2.cursos.id_curso=id_curso;
		$scope.estudiante2.cursos.nombre_curso=nombre_curso;
		$scope.estudiante2.cursos.precio_curso=precio_curso;

		if (validatecedula === true) {
			$http.post('/estudiante/login', $scope.estudiante2).success(function(data) {
				if (data.estado === 0) {
					localStorage.setItem("estudiante",  JSON.stringify($scope.estudiante2));//lenamos la bandera
					localStorage.setItem("cedula_estudiante", cedula);
					localStorage.setItem("contrasena_estudiante",contrasena);

					localStorage.setItem("nombres_estudiante", data.doc.nombres);
					localStorage.setItem("apellido1_estudiante", data.doc.apellido1);
					localStorage.setItem("apellido2_estudiante", data.doc.apellido2);
					localStorage.setItem("sexo_estudiante", data.doc.sexo);

					
					if (data.curso === 0) {
						alertify.success(data.mensaje);
					}
					if(data.curso === 1){
						alertify.success("Autenticado correctamente");
						alertify.notify("Este curso ya lo eligio");
					}
					div = document.getElementById('perfil');
        			div.style.display = 'block';
					$uibModalInstance.close();
					
				}else{
					if(data.estado === 1){
						alertify.notify(data.mensaje);
					}else{
						alertify.notify(data.mensaje);
				
					}
				}
			});	
		}
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
    };


	//ocultar la caja de login
	$scope.visible = function () {http://127.0.0.1:10000/#/57f03d296a3845c408db49c1
		document.getElementById('container_register').style.display = 'block';
		document.getElementById('container_login').style.display = 'none';
	}
	//ocultar la caja de login
	$scope.visible2 = function () {
		
		document.getElementById('container_login').style.display = 'block';
		document.getElementById('container_register').style.display = 'none';
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
				
					//alert( "La c\xe9dula NO es v\xe1lida!!!" );
					alertify.warning("Cédula no válida");
					return false;
				}
			}
			else
			{
		
				alertify.warning("Debe de tener 10 dígitos la cédula");
				return false;
			}
		}

  }]);

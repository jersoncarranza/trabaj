 'use strict';

angular.module('App')
  .controller('pensionModalCtrl', [ '$scope','$http','$uibModal','$uibModalInstance', function ($scope,$http,$uibModal,$uibModalInstance) {
  	
  	let mesLetras= "0";
  	$scope.mesesPagados="0"
  	$scope.pagos=[];
  	let duracionCurso=0;
  	let pagos = []; 
  	let curso = [];
  	let click = 0;
  	var globalpagos;
  	//cargarDatos();
  	setTimeout(function(){
	        cargarDatos();
	   		 }, 200);
  	function cargarDatos () {
  		var cedula   = localStorage.getItem("estudiante.cedula");
		var id_curso = localStorage.getItem("curso.id_curso");

  		$http.get('/estudiante/listcedula/'+cedula).success(function (data) {
			$scope.estudiante  = data;
		});

  		$http.get('/pensiones/materiapagos/'+cedula).success(function (data) {
			$scope.cursos  = data.cursos;
			var cursos	   = data.cursos;
			curso = [];
			//===========================================
			for (var i = 0; i < cursos.length; i++) {
				if (cursos[i].id_curso == id_curso) {
					
					curso.push({
						nombre_curso: cursos[i].nombre_curso,
						pagos:cursos[i].pagos
					})
				}
			}
			
			$scope.pagos = curso[0];
			globalpagos = $scope.pagos.pagos.length;
			console.log("globalpagos",globalpagos);
			//==========pagos = curso[0];
			//==========================================
		});

		$http.get('/curso/getid/'+id_curso).success(function (data) {
			$scope.curso  = data[0];
			$scope.curso.fecha_inicio= $scope.curso.fecha_inicio.substr(0,10);
			$scope.curso.fecha_iniciof2 = $scope.curso.fecha_inicio.slice(5, -3);
			mesLetras = $scope.curso.fecha_iniciof2;
			duracionCurso = $scope.curso.meses;
			trasnformar();
			
		
		});
	};



	function trasnformar() {
		var hoy = new Date();
		$scope.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
		$scope.auxmes = mesLetras;
		$scope.mesNumero = mesLetras;

		let mes = mesLetras
		switch (mes) {
		    case '01':
		        mes = "Enero";
		        break;
		    case '02':
		        mes = "Febrero";
		        break;
		    case '03':
		        mes = "Marzo";
		        break;
		    case '04':
		        mes = "Abril";
		        break;
		    case '05':
		        mes = "Mayo";
		        break;
		    case '06':
		        mes = "Junio";
		        break;
		    case '07':
		        mes = "Julio";
		        break;
		    case '08':
		        mes = "Agosto";
		        break;
		    case '09':
		        mes = "Septiembre";
		        break;
		    case '10':
		        mes = "Octubre";
		        break;
		    case '11':
		        mes = "Noviembre";
		        break;
		    case '12':
		        mes = "Diciembre";
		        break;
  			default:
    			mes=$scope.curso.fecha_iniciof2;
		}

		$scope.mes = mes;
		pagosMostrar();
	};

	function mejorar() {
		console.log("mejorar")
		$scope.mes = mesLetras;
	}

	function pagosMostrar() {

		if (globalpagos != 0) {
			mesLetras = globalpagos;
			var b = parseInt($scope.auxmes);

			if (globalpagos == (duracionCurso) ) {
				$scope.myVar = false ;
				$scope.myVar2 = true ;
			}
			trasnformar2(mesLetras)
			mesesPagados();
		}else{
			console.log("No hacer nada");
		}
		
	
	}
	function trasnformar2(mes) {
		var aux = parseInt($scope.mesNumero);
		mes = mes + aux;
		$scope.mesNumero=mes;
		switch (mes) {
		    case 1:
		        mes = "Enero";
		        break;
		    case 2:
		        mes = "Febrero";
		        break;
		    case 3:
		        mes = "Marzo";
		        break;
		    case 4:
		        mes = "Abril";
		        break;
		    case 5:
		        mes = "Mayo";
		        break;
		    case 6:
		        mes = "Junio";
		        break;
		    case 7:
		        mes = "Julio";
		        break;
		    case 8:
		        mes = "Agosto";
		        break;
		    case 9:
		        mes = "Septiembre";
		        break;
		    case 10:
		        mes = "Octubre";
		        break;
		    case 11:
		        mes = "Noviembre";
		        break;
		    case 12:
		        mes = "Diciembre";
		        break;
  			default:
    			mes=$scope.curso.fecha_iniciof2;
		}

		$scope.mes = mes;//Mes que comienza las clases
		
	};
	//============Meses cancelados
	function mesesPagados() {
		$scope.auxmes;
		if (globalpagos != 0 ) {

		mesLetras = globalpagos;

		$scope.mesesPagados = mesLetras;
		$scope.meses2=[];
		var a = parseInt($scope.mesesPagados);
		var b = parseInt($scope.auxmes);
		for (var i = 0; i < a; i++) {

			var aux =b+i;

			var res = trasnformar3(aux);
			$scope.meses2.push({
				mes:res
			});
		}

		}
		
	}

	function trasnformar3(mes) {
		switch (mes) {
		    case 1:
		        mes = "Enero";
		        break;
		    case 2:
		        mes = "Febrero";
		        break;
		    case 3:
		        mes = "Marzo";
		        break;
		    case 4:
		        mes = "Abril";
		        break;
		    case 5:
		        mes = "Mayo";
		        break;
		    case 6:
		        mes = "Junio";
		        break;
		    case 7:
		        mes = "Julio";
		        break;
		    case 8:
		        mes = "Agosto";
		        break;
		    case 9:
		        mes = "Septiembre";
		        break;
		    case 10:
		        mes = "Octubre";
		        break;
		    case 11:
		        mes = "Noviembre";
		        break;
		    case 12:
		        mes = "Diciembre";
		        break;
  			default:
    			console.log("Error");
		}

		return(mes);
		
	};
	//===========Cancelar
	$scope.pagar = function () {

		var cedula = localStorage.getItem("estudiante.cedula");

		var cursos=[{
			cedula:cedula,
			id_curso:$scope.curso._id,
			meses:$scope.curso.meses,
			pagos:[{	
				mes:      parseInt($scope.mesNumero),
				cantidad: $scope.curso.pension
			}]

		}]
		cursos = cursos[0];
		$scope.cursos = cursos;
		console.log('$scope.cursos',$scope.cursos);
		//=========================================
		if (click == 0) {
		
		$http.post('/pensiones/materiapagos/', $scope.cursos).success(function (data) {
			$scope.respuesta  = data;
			if (data.estado == 1) {
				alertify.success(data.mensaje);
				reporte();
			}else{
				if (data.estado == 2) {
					alertify.alert("Esta al día","Ya canceló todos los meses", function(){
				    	trasnformar2();
				    	alertify.message('OK');

				  	});
					
				}else{
					alertify.error(data.mensaje);
				}
			}
		});
		
		$uibModalInstance.close();
		click=1;
		}else{
			alertify.notify("Doble click");
			  $uibModalInstance.close();
		}
		//=========================================
		
	}

	 //boton cancelar
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
        alertify.notify("Se canceló");
	};


	//==========reporte
	function reporte() {
		var doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFontType("bolditalic");
        doc.text(80 , 20 , "Fundación 'JASPE'");
        doc.text(70 , 30 , "Comprobante de Pensión");

        doc.setFontSize(12);
        doc.setFontType("");
        let x = 30;
        let y = 50;

        doc.text(x, y ,    "Cédula   : " +$scope.estudiante.cedula);
        doc.text(x, y +10 , "Nombres : " + ($scope.estudiante.nombres).toUpperCase()+" "+ ($scope.estudiante.apellido1).toUpperCase()+" "+($scope.estudiante.apellido2).toUpperCase());
        doc.text(x+95,y, "Fecha de emisión : "+ $scope.fecha);
        doc.text(x+95,y+10,"Atentido por : Carolina Alban");
        
        var texto= "Comprobante de pensión por el curso de " + $scope.curso.nombre +" correspondiente al mes de "+ $scope.mes+""
        y=y+30;
        doc.setFontType("bold");
        doc.text(x,y,texto);
        texto = " por el valor de $"+ $scope.curso.pension+"."
        doc.text(x,y+10,texto);
 		doc.setLineWidth(1);
        doc.line(80, 200, x + 120, 200);


        doc.text(105, 205, "Firma");
        doc.save('pension');
	}

}]);
'use strict';

angular.module('AppHome')
  .controller('cursodetailCtrl',['cursoFactory', '$scope' , '$routeParams','$http','$uibModal', function (cursoFactory, $scope, $routeParams, $http, $uibModal) {
  	
  	cursoFactory.find($routeParams.id , function (curso) {
  		$scope.curso = curso;
  		$scope.curso = $scope.curso[0];

  		var cadenaAnalizar = $scope.curso.fecha_inicio;
  	    var aux_fecha = "";
  	    var dia="";
  	    var mes="";
  	    var ao="";
  		
  		for(var i=0; i<cadenaAnalizar.length; i++) 
  			{
  				if (i<=9) {
  					aux_fecha = aux_fecha + cadenaAnalizar.charAt(i);
  					if(i>=0 && i<=3 ){
  						ao = ao + cadenaAnalizar.charAt(i)
  					}
  					if(i==5 || i==6 ){
  						mes = mes + cadenaAnalizar.charAt(i)
  					}
  					if(i==8 || i==9 ){
  						dia = dia + cadenaAnalizar.charAt(i)
  					}
  				}
  			}

 
  		//mes
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
    			console.log("Error");
		}
		ao=" del " + ao;
		mes = " de " + mes; 
		var res = dia.concat(mes,ao);

  	//	console.log("El mes en letras", res);
		$scope.curso.fecha_inicio = res;
  		//console.log("$scope.curso", $scope.curso);
  	});

 
	$scope.open = function (curso) {

        
        //saber el curso
        var id_curso =  curso._id;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("id_curso", id_curso);
            localStorage.setItem("nombre_curso", curso.nombre);
            localStorage.setItem("precio_curso", curso.precio);
            localStorage.setItem("curso", JSON.stringify(curso));
         
        }

        localStorage.setItem("curso", JSON.stringify(curso));

        var aux_estudiante = localStorage.getItem("estudiante");
        //console.log("antes open",aux_estudiante);
        if (aux_estudiante === null) {
            var size= 'md';
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/home/estudianteopcion1.html',
                controller: "estudianteCtrl",
                size: size,
            });
        }else{
             var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/home/estudianteopcion2.html',
                controller: "estudiante2Ctrl",
                size: size,
            });
        }
        
	};


  }]);

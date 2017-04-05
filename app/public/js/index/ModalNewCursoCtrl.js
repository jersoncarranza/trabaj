 'use strict';

angular.module('App')
	.controller('ModalNewCursoCtrl',['$scope','$http', 'upload', '$uibModal','$uibModalInstance' , function ($scope,$http,upload, $uibModal, $uibModalInstance) {
  		

  	
  		//Guardar
	  	$scope.Save=function () {
	      //$scope.curso.archivo = document.getElementById("file").value;
	      //var nombre = $scope.curso.nombre;
	      //var descripcion = $scope.curso.descripcion;
	      var file = $scope.file;

	      $scope.curso.fecha_inicio = $scope.dt;
	      var curso = $scope.curso;
	      
	      
	      upload.uploadFile(file, curso).then(function(res)
	      {
	      	console.log(res);
	      	limpiar();
	      	GetAllCurso();
	      	if (res.data.estado === 0) {
	      		alertify.success("Se guardó. Actualicé para ver los cambios");
	      	}else{
                alertify.notify(res.data.mensaje);
            }
	      });
	     $uibModalInstance.close(); 
	     
	  	};
	  	//cancelar
	  	$scope.Cancel=function () {
	  		  $uibModalInstance.close(); 
	  	/*	if ($scope.curso.nombre != null) {
	  			$scope.curso.nombre = null;
	  		}

	  		if ($scope.curso.descripcion != null) {
	  			$scope.curso.descripcion = null;
	  		}

	  		document.getElementById("name").style.borderColor = "Silver";
			document.getElementById("descripcion").style.borderColor = "Silver";

			var x = document.getElementsByClassName("help-block");

			var i;
			for (i = 0; i < x.length; i++) {
			    x[i].style.display  = 'none';
			}

			document.getElementById("file").value = null;
	  		 $scope.archivo =null;*/

	  		//$scope.dt = null;
	  		//$scope.dt2 = null;
	  	};
	  	//limpiar
	  	function limpiar(){
	  		$scope.curso.nombre = null;
	  		$scope.curso.apellido = null;
	  		$scope.curso.descripcion = null;
	  		//$scope.dt = null;
	  		//$scope.dt2 = null;
	  		$scope.file="";

			document.getElementById("name").style.borderColor = "Silver";
			document.getElementById("descripcion").style.borderColor = "Silver";

			var x = document.getElementsByClassName("help-block");

			var i;
			for (i = 0; i < x.length; i++) {
			    x[i].style.display  = 'none';
			}
	  	};

	  	//listar
	   	function GetAllCurso() {
	        $http.get('/curso/getall').success(function (data, status, headers, config) {
	            $scope.cursos = data;
	        })
	        .error(function (data, status, header, config) {
	            $scope.ResponseDetails = "Data: " + data +
	                "<br />status: " + status +
	                "<br />headers: " + jsonFilter(header) +
	                "<br />config: " + jsonFilter(config);
	        });
	    };
	    GetAllCurso();

	    //ventana Modal
	    $scope.animationsEnabled = true;
    	$scope.open = function (data) {
    		var size= 'lg';
    		var id =  data._id;
    		if (typeof(Storage) !== "undefined") {
    			localStorage.setItem("id", id);
    			var aux = localStorage.getItem("id");
    			
			} else {
    		
			}

        	var modalInstance = $uibModal.open({
	        	animation: $scope.animationsEnabled,
	        	ariaLabelledBy: 'modal-title',
	      		ariaDescribedBy: 'modal-body',
	        	templateUrl: 'views/index/modalcurso.html',
	        	controller: "ModalCursoCtrl",
	        	size: size,
        	});

	        modalInstance.result.then(function () {
	        	GetAllCurso();	
	        });
		};

		//Open control
		$scope.opencurso = function () {
			var size= 'md';
			var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			ariaLabelledBy: 'modal-title',
	      	ariaDescribedBy: 'modal-body',
			templateUrl: 'views/index/modalnewcurso.html',
			controller: "ModalNewCursoCtrl",
			size: size
			});
			
			modalInstance.result.then(function () {
			GetAllCurso();
			});

		};
	  
	  	//Eliminar
	  	$scope.remove = function (data) {
	  		console.log("data id remove =======>", data._id);
	  		var id = data._id;
	  		$http.delete('/curso/remove/' +id).success(function (data) {
				console.log(data);
				GetAllCurso();

			});
	  	};


	  	$scope.today = function() {
    		$scope.dt = new Date();
    		$scope.dt2 = new Date();
  		};

  		$scope.today();

	 	 $scope.clear = function() {
	    	$scope.dt = null;
	    	$scope.dt2 = null;
	  	};

	  	$scope.inlineOptions = {
	    	customClass: getDayClass,
	  	  	minDate: new Date(),
	    	showWeeks: true
	  	};

	  	$scope.dateOptions = {
		    //dateDisabled: disabled,
		    formatYear: 'yy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
	  	};

	  // Disable weekend selection
	 	function disabled(data) {
	    	var date = data.date,
	      	mode = data.mode;
	    	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  	}

	  	$scope.toggleMin = function() {
	    	$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	    	$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	  	};

	 	$scope.toggleMin();

	  	$scope.open1 = function() {
	    	$scope.popup1.opened = true;
	  	};

	  	$scope.open2 = function() {
	    	$scope.popup2.opened = true;
	  	};

	  	$scope.setDate = function(year, month, day) {
	    	$scope.dt = new Date(year, month, day);
	    	$scope.dt2 = new Date(year, month, day);
	  	};

	  	$scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  	$scope.format = $scope.formats[0];
	  	$scope.altInputFormats = ['M!/d!/yyyy'];

	  	$scope.popup1 = {
	    	opened: false
	  	};

	  	$scope.popup2 = {
	    	opened: false
	  	};

	  	var tomorrow = new Date();
	  	tomorrow.setDate(tomorrow.getDate() + 1);
	  	var afterTomorrow = new Date();
	  	afterTomorrow.setDate(tomorrow.getDate() + 1);
	  	$scope.events = [
	    	{
	      	date: tomorrow,
	      	status: 'full'
	    	},
	   	 {
	      	date: afterTomorrow,
	      	status: 'partially'
	    	}
	  	];

	  	function getDayClass(data) {
	    	var date = data.date,
	      	mode = data.mode;
	    	if (mode === 'day') {
	      	var dayToCheck = new Date(date).setHours(0,0,0,0);

	      	for (var i = 0; i < $scope.events.length; i++) {
	        	var currentDay = new Date($scope.events[i].date);
	        	//var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	       		if (dayToCheck === currentDay) {
	          		return $scope.events[i].status;
	        		}
	      		}
	    	}

	    	return '';
	  	}

 }])

.directive('uploaderModel',["$parse", function ($parse) {
	return{
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on("change", function (e) 
			{
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}])
//subir imagenes
.service('upload',["$http", "$q", function ($http, $q) {
	this.uploadFile = function (file, curso)
	{
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("file", file);
		formData.append("nombre", curso.nombre);
		formData.append("descripcion", curso.descripcion);
		formData.append("fecha_inicio", curso.fecha_inicio);
		formData.append("precio", curso.precio);
		console.log("precio : ", curso.precio);

		return $http.post("/curso/register", formData,{
			headers:{
				"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function (res) {
			deferred.resolve(res);
		})
		.error(function(msg, code) {
			deferred.reject(msg);
		})
		return deferred.promise;
	}
}])
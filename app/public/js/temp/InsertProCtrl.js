 'use strict';

angular.module('App')
  .controller('InsertProCtrl', function ($scope,$http, $uibModal, $log) {

		var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
	
	GetAllTeacherSuplent();

	function GetAllTeacherSuplent() {
		$http.get('/profesor/ListSuplentTeacher').success(function (data, status, headers, config) {
			$scope.profesor = data;

		})
		.error(function (data, status, header, config) {
			$scope.ResponseDetails = "Data: " + data +
				"<br />status: " + status +
				"<br />headers: " + jsonFilter(header) +
				"<br />config: " + jsonFilter(config);
		});
	};


	$scope.formVisibility=false;
	$scope.ShowForm = function () {
		$scope.formVisibility=true;
	};

	$scope.animationsEnabled = true;
	var size= 'lg';
	//modal añadir persona 
	$scope.open = function () {
		var modalInstance = $uibModal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'views/modalprofesor.html',
		controller: "ModalProCtrl",
		size: size,
		});

		modalInstance.result.then(function () {
		GetAllTeacherSuplent();
		});

	};
	//actualizar
	$scope.update = function(pr) {
	  $scope.contact = pr;
	  console.log("Este es los .", $scope.contact);
	  $http.put('/profesor/update/' + $scope.contact._id, $scope.contact).success(function(response) {
		GetAllTeacherSuplent();
	  })
	 // document.getElementById({{$scope.contact.id}}).style.display = 'none';
	  
	};

	//ventana modal rol de pagos
	$scope.openrol = function () {
    	var size= 'lg';
    	/*
    	var id =  data._id;
    	if (typeof(Storage) !== "undefined") {
    		localStorage.setItem("id", id);
    		var aux = localStorage.getItem("id");
    			
		} else {
    		
		}
		*/

    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/modalrolpagos.html',
        	controller: "ModalrolpagosCtrl",
        	size: size,
    	});

        modalInstance.result.then(function () {
        	GetAllCurso();	
        });
	};


  });

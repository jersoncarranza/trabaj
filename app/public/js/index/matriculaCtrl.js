 'use strict';

angular.module('App')
  .controller('matriculaCtrl', function ($scope,$http, $uibModal, $log) {

	var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
	
    var datosEstudiantes;
	//listar estudiante
   	function GetAllEstudiante() {
        $http.get('/estudiante/list').success(function (data, status, headers, config) {
            $scope.estudiante = data;
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };
    GetAllEstudiante();

    //abrir ventana modal
    $scope.open = function (data) {

        var id_estudiante =  data.id;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("id_estudiante", id_estudiante);
         
        }


    	var size= 'lg';
    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/ModalMatricula.html',
        	controller: "ModalMatriculaCtrl",
        	size: size,
    	});
	};
	//
    var id = localStorage.getItem("id_rol");

    //------------
/*	function GetAllTeacherSuplent() {
		$scope.gridOptions = {
			data: ['hola'],
		    enableSorting: true,
	    	onRegisterApi: function( gridApi ) {
	      		$scope.grid1Api = gridApi;
	    	},
		    columnDefs: [
		      { field: 'Name' },
		      { field: 'Computer' },
		      { field: 'Usb' },
		    ],
	 	};
		
		$http.get('/profesor/listTeacher')
	    .success(function(data) {
	      $scope.gridOptions.data = data;
	      console.log("usb",$scope.gridOptions.data)
	    });

	};*/

  });
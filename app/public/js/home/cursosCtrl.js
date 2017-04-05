 'use strict';

angular.module('AppHome')
  .controller('cursosCtrl',['$scope','$http', '$uibModal', '$log','cursoFactory', function ($scope,$http, $uibModal, $log, cursoFactory) {

  		cursoFactory.list(function (curso) {
        $scope.curso = curso;
   
    });

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

  }]);

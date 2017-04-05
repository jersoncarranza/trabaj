 'use strict';

angular.module('AppHome')
  .controller('somosCtrl', function ($scope,$http, $uibModal, $log) {

  	function GetAllFundacion() {
	 	 $http.get('/fundacion/getall').success(function (data, status, headers, config) {
		 	$scope.fundacion = data;
	 	 })
	  	.error(function (data, status, header, config) {
		  $scope.ResponseDetails = "Data: " + data +
			  "<br />status: " + status +
			  "<br />headers: " + jsonFilter(header) +
			  "<br />config: " + jsonFilter(config);
		});
  	};
	GetAllFundacion();


  });

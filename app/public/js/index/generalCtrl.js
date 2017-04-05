 'use strict';

angular.module('App')
  .controller('generalCtrl', [ '$scope','$http', function ($scope,$http) {

 	
	$scope.SaveMision = function() {
		var data = $scope.curso;
		var id = data._id;
		console.log("Id", id);
		
		if (bandera !== null) {
			$http.put('/fundacion/edit/' +  id , data ).success(function (data) {
				$scope.profesor = data;
			})
			.error(function (data, status, header, config) {
				$scope.ResponseDetails = "Data: " + data +
				"<hr />status: " + status +
				"<hr />headers: " + header +
				"<hr />config: " + config;
			});
		}else{
			///fundacion/getall
			$http.post('/fundacion/register' , data ).success(function (data) {
				$scope.profesor = data;
			})
			.error(function (data, status, header, config) {
				$scope.ResponseDetails = "Data: " + data +
				"<hr />status: " + status +
				"<hr />headers: " + header +
				"<hr />config: " + config;
			});
		};


	};

	$scope.SaveVision = function() {
		var data = $scope.curso.vision;
		console.log("mision", data);
	
	};

	var bandera=null;
	function GetFundacion (){
		$http.get('fundacion/getall').success(function (data, status, headers, config) {
            $scope.curso = data;
            bandera = data;
            console.log("bandera ", bandera._id);
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
	    });
	};

	GetFundacion();

}]);


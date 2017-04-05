 'use strict';

angular.module('App')
  .controller('ModalrolpagosCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

		
    var id = localStorage.getItem("id_rol");
    GetIdProfesor();
    //listar
    function GetIdProfesor() {
        $http.get('/profesor/list/'+ id).success(function (data, status, headers, config) {
            $scope.profesor = data;
            console.log("Hola ", data);
    
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};


}]);


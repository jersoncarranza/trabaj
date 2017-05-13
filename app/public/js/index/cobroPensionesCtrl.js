 'use strict';

angular.module('App')
  .controller('cobroPensionesCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {
  
  	function actualizarLista () {
		$http.get('/pensiones/materia/').success(function (data) {
			$scope.estudiantes  = data;
		

			for (var j = 0; j < data.length; j++) {
				for (var i = 0; i < data[j].cursos.length; i++) {
					//sacar del vector los cursos que el estuidantes no esta matriculado
					if (data[j].cursos[i].estado == "0") {
						var item = data[j].cursos[i];
						var index = $scope.estudiantes[j].cursos.indexOf(item);
						$scope.estudiantes[j].cursos.splice(index,1);
					
					} 
				}
			}
			if (data == null) {
				alertify.error(data.mensaje);
			}

		});
	};
	actualizarLista();

	$scope.pensionModal = function (estudiante, curso) {

		localStorage.setItem("estudiante.cedula", estudiante.cedula);
		localStorage.setItem("curso.id_curso", curso.id_curso);

		

	

		var size= 'lg';
    	var modalInstance = $uibModal.open({
        	animation: $scope.animationsEnabled,
        	ariaLabelledBy: 'modal-title',
      		ariaDescribedBy: 'modal-body',
        	templateUrl: 'views/index/pensionModal.html',
        	controller: "pensionModalCtrl",
        	size: size,
    	});

	};


}]);
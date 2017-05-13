 'use strict';

angular.module('App')
  .controller('arriendoCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

    $scope.refresh = function () {
        disparador()
    };
    //cargar los datos
    function disparador() {
        $http.get('/arriendo/list').success(function (data) {
            $scope.arriendo = data;
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                $scope.arriendo[i].fecha = data[i].fecha.substring(0, 10);
            }

            if (data == null) {
                alertify.error(data.mensaje);
            }
        });

    };
    disparador();

    $scope.arriendoRegistrar = function(){
        var size= 'md';
        var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'views/index/modalRegistrarArriendo.html',
        controller: "modalRegistrarArriendoCtrl",
        size: size
        });
        
        modalInstance.result.then(function () {
            disparador();
        });
        
    };


}]);
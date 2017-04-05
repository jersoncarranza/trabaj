 'use strict';

angular.module('App')
  .controller('situacioninicialCtrl', function ($scope,$http, $uibModal, $log) {

    var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
    
    //listar estudiante
    $scope.open = function () {
        var size= 'lg';
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/index/modalNuevoESI.html',
            controller: "ModalNuevoESICtrl",
            size: size,
        });

        modalInstance.result.then(function () {
            GetLibroDiario(); 
        });
    };

  });
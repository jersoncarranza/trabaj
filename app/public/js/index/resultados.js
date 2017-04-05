 'use strict';

angular.module('App')
  .controller('ResultadosCtrl',['teacherFactory','$scope', function (teacherFactory, $scope) {
    
    teacherFactory. resultadosall(function (data) {
        $scope.data = data;
        $scope.data = $scope.data.resultados;

        console.log("esto data resultados--", $scope.data);

    });
}]);

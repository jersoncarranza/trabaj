 'use strict';

angular.module('App')
  .controller('MainCtrl',['teacherFactory','$scope', function (teacherFactory, $scope) {
    
    
    teacherFactory.list(function (teacher) {
        $scope.profesor = teacher;
   
    });


}]);

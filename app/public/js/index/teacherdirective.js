 'use strict';

angular.module('App')
  .directive('profesor',['teacherFactory', function (teacherFactory) {
  	
    return{
    			scope:{
    				profesor:'='
    			},
    			restrict:'A',
    			templateUrl: '../views/teacher.html',
          controller: function ($scope) {

            teacherFactory.find($scope.profesor.id, function (profesor) {
             //console.log("dexxid===>",$scope.profesor);
              $scope.imagen = profesor.imagen;
             // console.log("es prevotos", $scope.imagen );
            });
            
          }
    		
    		};
  		
  }]);
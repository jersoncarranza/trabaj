 'use strict';

angular.module('AppHome')
  .directive('curso',['cursoFactory', function (cursoFactory) {
  	
    return{
    			scope:{
    				curso:'='
    			},
    			restrict:'A',
    			templateUrl: '../views/home/curso.html',
          controller: function ($scope) {

            cursoFactory.find($scope.curso.id, function (curso) {
             //console.log("dexxid===>",$scope.curso);
              $scope.imagen = curso.imagen;
             // console.log("es prevotos", $scope.imagen );
            });
            
          }
    		
    		};
  		
  }]);
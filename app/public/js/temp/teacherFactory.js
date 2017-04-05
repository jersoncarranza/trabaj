 'use strict';

angular.module('App')
  .factory('teacherFactory', function ($http) {
  	
    var list = function (callback) {
      $http.get('/profesor/list/').success(function (data) {
          callback(data);
      });
    };
    /*
     var getPonies = function(successCallbackFn, errorCallbackFn) {
        $http.get('/api/ponies').success(function(data) {
          successCallbackFn(data);
        }).error(function(data) {
          errorCallbackFn(data);
        });
      };
    */
    return {
          //list5:list,
          
          list: function(callback){
            $http({
              method: 'GET',
              url: '/profesor/list/',
              cache: true
            }).success(callback);
          },
          find: function(id, callback){
            $http({
              method: 'GET',
              url: '/profesor/list/'+ id ,
              cache: true
            }).success(callback);
          },
          resultados: function (id, callback) {
            $http({
              method: 'GET',
              url: '/profesor/calificacion/' + id,
              cache: false
            }).success(callback);
          },
          resultadosall: function (callback) {
            $http({
              method: 'GET',
              url: '/profesor/calificacionall/',
              cache: false
            }).success(callback);
          }

		};
    

  
  });
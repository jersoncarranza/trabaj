 'use strict';

angular.module('App')
  .factory('cursoFactory', function ($http) {
	

	var find = function (id, callback) {
      $http.get('/curso/getid/'+id).success(function (data) {
          callback(data);
      });
    };

	return
		{
			find: find
		};
		
  });
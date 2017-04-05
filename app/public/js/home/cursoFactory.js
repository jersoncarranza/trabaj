 'use strict';

angular.module('AppHome')
  .factory('cursoFactory', function ($http) {
   
    return {
		list: function(callback){
		  $http({
		    method: 'GET',
		    url: '/curso/getall/',
		    cache: true
		  }).success(callback);
		},
		find: function(id, callback){
		  $http({
		    method: 'GET',
		    url: '/curso/getid/'+ id ,
		    cache: true
		  }).success(callback);
		}

	};
  
  });
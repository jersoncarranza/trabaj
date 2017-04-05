'use strict';

angular
	.module('App', [
		'ngRoute',
		'ngCookies',
		'ui.bootstrap',
		'ngAnimate',
		'ui.grid'
	 // 'teacherFactory'
		//'ui.bootstrap'
		//'ui.grid'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '../views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/profesor', {
				templateUrl: '../views/insertarprofesor.html',
				controller: 'InsertProCtrl',
				controllerAs: 'Pro'
			})
			.when('/resultados', {
				templateUrl: '../views/resultados.html',
				controller: 'ResultadosCtrl',
				controllerAs: 'Resul'
			})
			.when('/curso', {
				templateUrl: '../views/curso.html',
				controller: 'cursoCtrl',
				controllerAs: 'listar'
			})
			.when('/general', {
				templateUrl: '../views/index/general.html',
				controller: 'generalCtrl',
				controllerAs: 'general'
			})
			.when('/:id', {
				templateUrl: '../views/teacher-detail.html',
				controller: 'teacher-detail',
				controllerAs: 'tc'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

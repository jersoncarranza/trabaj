'use strict';

angular
	.module('AppHome', [
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
				templateUrl: '../views/home/index.html',
				controller: 'indexCtrl',
				controllerAs: 'index'
			})
			.when('/somos', {
				templateUrl: '../views/home/somos.html',
				controller: 'somosCtrl',
				controllerAs: 'somos'
			})
			.when('/cursos', {
				templateUrl: '../views/home/cursos.html',
				controller: 'cursosCtrl',
				controllerAs: 'cursos'
			})
			.when('/perfil', {
				templateUrl: '../views/home/perfil.html',
				controller: 'perfilCtrl',
				controllerAs: 'perfil'
			})
			.when('/perfil/datos', {
				templateUrl: '../views/home/datos.html',
				controller: 'datosCtrl',
				controllerAs: 'datos'
			})
			.when('/navPanel', {
				templateUrl: '../views/home/index.html',
				controller: 'indexCtrl',
				controllerAs: 'index'
			})
			.when('/:id', {
				templateUrl: '../views/home/curso-detail.html',
				controller: 'cursodetailCtrl',
				controllerAs: 'detail'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

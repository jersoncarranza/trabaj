'use strict';

angular
	.module('App', [
		'ngRoute',
		'ngCookies',
		'ui.bootstrap',
		'ngAnimate',
		'ui.grid',
		'pdf'
	 // 'teacherFactory'
		//'ui.bootstrap'
		//'ui.grid'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '../views/index/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/profesor', {
				templateUrl: '../views/index/profesor.html',
				controller: 'profesorCtrl',
				controllerAs: 'Pro'
			})
			.when('/resultados', {
				templateUrl: '../views/index/resultados.html',
				controller: 'ResultadosCtrl',
				controllerAs: 'Resul'
			})
			.when('/curso', {
				templateUrl: '../views/index/curso.html',
				controller: 'cursoCtrl',
				controllerAs: 'listar'
			})
			.when('/matricula', {
				templateUrl: '../views/index/matricula.html',
				controller: 'matriculaCtrl',
				controllerAs: 'listar'
			})
			.when('/general', {
				templateUrl: '../views/index/general.html',
				controller: 'generalCtrl',
				controllerAs: 'general'
			})

			.when('/estudiante', {
				templateUrl: '../views/index/estudiante.html',
				controller: 'estudianteCtrl',
				controllerAs: 'estudiante'
			})
			.when('/cuenta', {
				templateUrl: '../views/index/cuenta.html',
				controller: 'cuentaCtrl',
				controllerAs: 'cuenta'
			})
			.when('/diario', {
				templateUrl: '../views/index/librodiario.html',
				controller: 'librodiarioCtrl',
				controllerAs: 'diario'
			})
			.when('/pensiones', {
				templateUrl: '../views/index/cobroPensiones.html',
				controller: 'cobroPensionesCtrl',
				controllerAs: 'pensiones'
			})
			.when('/situacioninicial', {
				templateUrl: '../views/index/situacioninicial.html',
				controller: 'situacioninicialCtrl',
				controllerAs: 'esi'
			})
			.when('/mayor', {
				templateUrl: '../views/index/libromayor.html',
				controller: 'libromayorCtrl',
				controllerAs: 'mayor'
			})
			.when('/materiales', {
				templateUrl: '../views/index/materiales.html',
				controller: 'materialesCtrl',
				controllerAs: 'materiales'
			})
			.when('/arriendo', {
				templateUrl: '../views/index/arriendo.html',
				controller: 'arriendoCtrl',
				controllerAs: 'arriendo'
			})
			.when('/flujocaja', {
				templateUrl: '../views/index/flujoCaja.html',
				controller: 'flujoCajaCtrl',
				controllerAs: 'flujoCaja'
			})
			.when('/balance', {
				templateUrl: '../views/index/balanceComprobacion.html',
				controller: 'balanceComprobacionCtrl',
				controllerAs: 'balanceComprobacion'
			})
			.when('/graficos', {
				templateUrl: '../views/index/graficos.html',
				controller: 'graficosCtrl',
				controllerAs: 'graficos'
			})
			.when('/graficos/cursos', {
				templateUrl: '../views/index/graficoscursos.html',
				controller: 'graficoscursosCtrl',
				controllerAs: 'gcursos'
			})
			.when('/graficos/cursosganancia', {
				templateUrl: '../views/index/cursosganancia.html',
				controller: 'cursosgananciaCtrl',
				controllerAs: 'cursosganancia'
			})
			.when('/graficos/graficosmateriales', {
				templateUrl: '../views/index/graficosmateriales.html',
				controller: 'graficosmaterialesCtrl',
				controllerAs: 'graficosmateriales'
			})
			.when('/graficos/graficosgastos', {
				templateUrl: '../views/index/graficosgastos.html',
				controller: 'graficosgastosCtrl',
				controllerAs: 'graficosgastos'
			})
			.when('/:id', {
				templateUrl: '../views/index/teacher-detail.html',
				controller: 'teacher-detail',
				controllerAs: 'tc'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

//jose5001m gmail.com
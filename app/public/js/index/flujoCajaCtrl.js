 'use strict';
angular.module('App')
  .controller('flujoCajaCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

 	$scope.cuentameses;//agrupar las cuentas por meses
 	var abril=[];
 	var mayo=[];
	function disparador () {
		$http.get('/contabilidad/flujocaja/').success(function (data) {
			$scope.cuentameses = data;
			agruparmeses($scope.cuentameses);
		});
	};

	disparador();


	function agruparmeses(cuentameses){
		for (var i = 0; i < cuentameses.length; i++) {
			var day;
			var str =cuentameses[i].fecha;
			var res = str.substring(5, 7);
			//console.log(res);
			switch (res) {
			    case "01":
			        day = "Enero";
			        break;
			    case "02":
			        day = "Febero";
			        break;
			    case "03":
			        day = "Marzo";
			        break;

			    case "04":
			        Abril(cuentameses[i]);
			        break;

			    case "05":
			        Mayo(cuentameses[i]);
			        break;

			    case "06":
			        Junio(cuentameses[i]);
			        day = "Junio";
			        break;

			    default:
			        day = "Julio";
			}
		}
		//console.log("cuentaMayo",cuentaMayoingresos);
	};

	var cuentaMayoIngresos=[];
	var cuentaMayoEgresos=[];
	var cuentaMayo=[];
	$scope.ingresos=[];
	$scope.egresos=[];

	function Mayo(cuenta){
		console.log(cuenta);
		var ingresos=0;
		var egresos=0;
		var bandera=0;
		var bani;
		if (cuentaMayo.length!==0) {	
			for (var i = 0; i < cuentaMayo.length; i++) {
				if (cuenta.sugerencia==cuentaMayo[i].sugerencia) {
					
					for (var j = 0; j< cuenta.debe.length; j++) {
						if (cuenta.debe[j].detalle == "caja"){
							cuentaMayo[i].ingresos=cuentaMayo[i].ingresos+cuenta.debe[j].cantidad ;

							for (var k = 0; k < $scope.ingresos.length; k++) {
								if ($scope.ingresos[k].sugerencia == cuenta.sugerencia) {
									$scope.ingresos[k].ingresos=$scope.ingresos[k].ingresos+cuenta.debe[j].cantidad;	
								}	
							}
						};
					}

					for (var j = 0; j < cuenta.haber.length; j++) {
						if (cuenta.haber[j].detalle == "caja"){

							cuentaMayo[i].egresos=cuentaMayo[i].egresos+cuenta.haber[j].cantidad;	
							
							for (var k = 0; k < $scope.egresos.length; k++) {
								if ($scope.egresos[k].sugerencia == cuenta.sugerencia) {
									$scope.egresos[k].egresos=$scope.egresos[k].egresos+cuenta.haber[j].cantidad;	
								}	
							}

						};
					}

					bandera=1
				}
			}//<For>

			if (bandera==0){
				console.log("añadir");
				

				for (var i = 0; i< cuenta.debe.length; i++) {
					if (cuenta.debe[i].detalle == "caja"){
						ingresos =cuenta.debe[i].cantidad;	
						bani=0;
					};
				}

				for (var i = 0; i < cuenta.haber.length; i++) {
					if (cuenta.haber[i].detalle == "caja"){
						egresos =cuenta.haber[i].cantidad;	
						bani=1;
					};
				}

				if (bani==0) {
					$scope.ingresos.push({
						sugerencia:cuenta.sugerencia,
						ingresos:ingresos
					});
				}

				if (bani==1) {
					$scope.egresos.push({
						sugerencia:cuenta.sugerencia,
						egresos:egresos
					});
				}

				cuentaMayo.push({
					sugerencia:cuenta.sugerencia,
					ingresos:ingresos,
					egresos:egresos
				});
				
			}

		}else{

			for (var i = 0; i< cuenta.debe.length; i++) {
				if (cuenta.debe[i].detalle == "caja"){
					ingresos =cuenta.debe[i].cantidad;
					bani=0;	
				};
			}

			for (var i = 0; i < cuenta.haber.length; i++) {
				if (cuenta.haber[i].detalle == "caja"){
					egresos =cuenta.haber[i].cantidad;
					bani=1;	
				};
			}

			if (bani==0) {
					$scope.ingresos.push({
						sugerencia:cuenta.sugerencia,
						ingresos:ingresos
					});
				}

				if (bani==1) {
					$scope.egresos.push({
						sugerencia:cuenta.sugerencia,
						egresos:egresos
					});
				}


			cuentaMayo.push({
				sugerencia:cuenta.sugerencia,
				ingresos:ingresos,
				egresos:egresos
			});

		}
		$scope.cuentaMayo=cuentaMayo;

		$scope.debeAbril=0;
		for (var i = 0; i < $scope.ingresos.length; i++) {
			$scope.debeAbril=$scope.ingresos[i].ingresos+$scope.debeAbril;
		}

		$scope.haberAbril=0;
		for (var i = 0; i < $scope.egresos.length; i++) {
			$scope.haberAbril=$scope.egresos[i].egresos+$scope.haberAbril;
		}
	};

	function Abril(cuenta){
		console.log("fmayo");
	};



	/***********************************/
	var cuentaJunioIngresos=[];
	var cuentaJunioEgresos=[];
	var cuentaJunio=[];
	$scope.ingresosJunio=[];
	$scope.egresosJunio=[];

	function Junio(cuenta){
		console.log(cuenta);
		var ingresos=0;
		var egresos=0;
		var bandera=0;
		var bani;
		if (cuentaJunio.length!==0) {	
			for (var i = 0; i < cuentaJunio.length; i++) {
				if (cuenta.sugerencia==cuentaJunio[i].sugerencia) {
					
					for (var j = 0; j< cuenta.debe.length; j++) {
						if (cuenta.debe[j].detalle == "caja"){
							cuentaJunio[i].ingresos=cuentaJunio[i].ingresos+cuenta.debe[j].cantidad ;

							for (var k = 0; k < $scope.ingresosJunio.length; k++) {
								if ($scope.ingresosJunio[k].sugerencia == cuenta.sugerencia) {
									$scope.ingresosJunio[k].ingresos=$scope.ingresosJunio[k].ingresos+cuenta.debe[j].cantidad;	
								}	
							}
						};
					}

					for (var j = 0; j < cuenta.haber.length; j++) {
						if (cuenta.haber[j].detalle == "caja"){

							cuentaJunio[i].egresos=cuentaJunio[i].egresos+cuenta.haber[j].cantidad;	
							
							for (var k = 0; k < $scope.egresosJunio.length; k++) {
								if ($scope.egresosJunio[k].sugerencia == cuenta.sugerencia) {
									$scope.egresosJunio[k].egresos=$scope.egresosJunio[k].egresos+cuenta.haber[j].cantidad;	
								}	
							}

						};
					}

					bandera=1
				}
			}//<For>

			if (bandera==0){
				console.log("añadir");
				

				for (var i = 0; i< cuenta.debe.length; i++) {
					if (cuenta.debe[i].detalle == "caja"){
						ingresos =cuenta.debe[i].cantidad;	
						bani=0;
					};
				}

				for (var i = 0; i < cuenta.haber.length; i++) {
					if (cuenta.haber[i].detalle == "caja"){
						egresos =cuenta.haber[i].cantidad;	
						bani=1;
					};
				}

				if (bani==0) {
					$scope.ingresosJunio.push({
						sugerencia:cuenta.sugerencia,
						ingresos:ingresos
					});
				}

				if (bani==1) {
					$scope.egresosJunio.push({
						sugerencia:cuenta.sugerencia,
						egresos:egresos
					});
				}

				cuentaJunio.push({
					sugerencia:cuenta.sugerencia,
					ingresos:ingresos,
					egresos:egresos
				});
				
			}

		}else{

			for (var i = 0; i< cuenta.debe.length; i++) {
				if (cuenta.debe[i].detalle == "caja"){
					ingresos =cuenta.debe[i].cantidad;
					bani=0;	
				};
			}

			for (var i = 0; i < cuenta.haber.length; i++) {
				if (cuenta.haber[i].detalle == "caja"){
					egresos =cuenta.haber[i].cantidad;
					bani=1;	
				};
			}

			if (bani==0) {
					$scope.ingresosJunio.push({
						sugerencia:cuenta.sugerencia,
						ingresos:ingresos
					});
				}

				if (bani==1) {
					$scope.egresosJunio.push({
						sugerencia:cuenta.sugerencia,
						egresos:egresos
					});
				}


			cuentaJunio.push({
				sugerencia:cuenta.sugerencia,
				ingresos:ingresos,
				egresos:egresos
			});

		}
		$scope.cuentaJunio=cuentaJunio;

		$scope.debeJunio=0;
		for (var i = 0; i < $scope.ingresosJunio.length; i++) {
			$scope.debeJunio=$scope.ingresosJunio[i].ingresos+$scope.debeJunio;
		}

		$scope.haberJunio=0;
		for (var i = 0; i < $scope.egresosJunio.length; i++) {
			$scope.haberJunio=$scope.egresosJunio[i].egresos+$scope.haberJunio;
		}
	};

	/***********************************/

}])
.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        var factor = "1" + Array(+(places > 0 && places +1)).join("0");
        return Math.round(input * factor) / factor;
    };
})

    .filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
    };
})
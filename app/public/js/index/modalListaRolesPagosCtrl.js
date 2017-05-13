 'use strict';

angular.module('App')
  .controller('modalListaRolesPagosCtrl', [ '$scope','$http', '$uibModalInstance', function ($scope,$http, $uibModalInstance) {

	var id = localStorage.getItem("cedularol");
	console.log("cedularol",id);
	getRolesCedula();

    function getRolesCedula() {
        var hoy = new Date();
        $http.get('/roldepagos/mostrarcedula/'+ id).success(function (data, status, headers, config) {           
           $scope.datos=[];
		    for (var i = 0; i < data.length; i++) {
		    	var mes = convertir(data[i].mes);
		    	
		    	$scope.datos.push({	
		    		mes:mes,
		    		sueldo:data[i].sueldo,
		    		comision:data[i].comision,
		    		iesstrabajador:data[i].iesstrabajador,
		    		date:data[i].date.substring(0, 10),
		    		prestamo:data[i].prestamo,
		    	}); 
		    }		
        });

        $http.get('/profesor/listcedula/'+ id).success(function (data, status, headers, config) {
            $scope.profesor = data;
            console.log(data);
        });
        
    };

    //=======Converitr Fecha Numero a Letras
    function convertir(mesn) {
    	var mes = -1;
    	if (mesn == 1) {mes ="Enero"}
    	if (mesn == 2) {mes ="Febrero"}
    	if (mesn == 3) {mes ="Marzo"}
    	if (mesn == 4) {mes ="Abril"}
    	if (mesn == 5) {mes ="Mayo"}
    	if (mesn == 6) {mes ="Junio"}
    	if (mesn == 7) {mes ="Julio"}
    	if (mesn == 8) {mes ="Agosto"}
    	if (mesn == 9) {mes ="Septiembre"}
    	if (mesn == 10) {mes ="Octubre"}
    	if (mesn == 11) {mes ="Noviembre"}
    	if (mesn == 12) {mes ="Diciembre"}
    	return mes;
    };
    //============Reporte======
    function reporte() {
        
        var doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFontType("bolditalic");
        doc.text(80 , 20 , "Fundación 'JASPE'");
        doc.text(90 , 30 , "Rol de Pagos");

        doc.setFontSize(12);
        doc.setFontType("");
        let x = 30;
        let y = 50;

        doc.text(x, y ,    "Nombres : " + ($scope.profesor.nombre +" " + $scope.profesor.apellido));
        doc.text(x, y +10 , "Cargo  : " + ($scope.profesor.cargo) );

        doc.text(x+90,y,"Atentido por : Carolina Alban");
        doc.text(x+90,y+10, "Fecha de emisión : "+ $scope.fecha);

        doc.setLineWidth(1);
        y=y+20;
        doc.line(x, y , x + 150, y );
        //============Ingresos
        doc.text(x,y+20, "Ingresos");
        doc.text(x,y+30, "Sueldo  :");
        doc.text(x+50,y+30, " $"+ (rol.sueldo).toString());

        doc.text(x,y+40, "Comisión:");
        doc.text(x+50,y+40, "$"+ (rol.comision).toString());
        
        var ingresos = rol.sueldo + rol.comision;
        doc.text(x,y+60, "Total Ingresos :");
        doc.text(x+50,y+60, "$"+ ingresos.toString());
        //============Descuentos
        doc.text(x+80,y+20, "Descuentos");
        doc.text(x+80,y+30, "Aporte IESS 9.45%        : " + " $"+(rol.iesstrabajador).toString());

        console.log
        doc.text(x+80,y+40, "Préstamos a la Fundación: " +" $"+ rol.prestamo);
        var descuentos = rol.iesstrabajador + rol.prestamo;
        doc.text(x+80,y+60, "Total Descuentos :");
        doc.text(x+127,y+60, "$"+ descuentos.toString());
        //================Total
        doc.setLineWidth(1);
        y=y+50;
        doc.line(x, y , x + 150, y );
        y=y+20;
        doc.setFontType("bold");
        doc.line(x, y , x + 150, y );
        doc.text(x,y+10, "Neto a pagar");
        var total = ingresos - descuentos;
        doc.text(x+127,y+10, "$"+total.toString());
        //================Firma
        y=y+50;
        doc.setFontType("");
        doc.line(x+60, y , x + 100, y );
        doc.text(x +65,y+8, "Recibi conforme");
        doc.text(x +65,y+16, "C.I " + ($scope.profesor.cedula).toString() );

        doc.save('roldepagos');
    };
    //============End Reporte =====
}]);



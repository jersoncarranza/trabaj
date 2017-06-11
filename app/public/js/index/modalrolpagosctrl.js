 'use strict';

angular.module('App')
  .controller('ModalrolpagosCtrl', [ '$scope','$http', '$uibModalInstance','$uibModal', function ($scope,$http, $uibModalInstance,$uibModal) {


    $scope.iess;
    var id = localStorage.getItem("id_rol");
    GetIdProfesor();
    //listar
    function GetIdProfesor() {

        var hoy = new Date();
        $scope.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();

        $scope.meses = {
            "type": "select", 
            "name": "Service",
            "value": "Abril", 
            "values": [ "Enero", "Febrero", "Marzo", "Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] 
          };

        

        $http.get('/profesor/list/'+ id).success(function (data, status, headers, config) {
            $scope.profesor = data;
            console.log(data);
            $scope.iess = data.sueldo * 0.0945;

            var places = 2;
            var input =  $scope.iess;
           
            var factor = "1" + Array(+(places > 0 && places +1)).join("0");
             $scope.iess =  Math.round(input * factor) / factor;
    
        });
       

       
       

    };

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

    var rol;
    var bandera=0;//sueldo comisión
    $scope.guardar = function () {
        guardar();
    };

    function guardar() {
         rol ={
            cedula:   $scope.profesor.cedula,
            nombre:   $scope.profesor.nombre +" "+ $scope.profesor.apellido,
            cargo:    $scope.profesor.cargo,
            mes:      $scope.meses.value,
            sueldo:   $scope.profesor.sueldo,
            comision: $scope.comisiones,
            iesstrabajador: ($scope.profesor.sueldo * 0.0945),
            prestamo:        $scope.descuento,
            iesspatrono:    ($scope.profesor.sueldo * 0.1115)
        }

        asignarvalor();

        var cuenta ="caja";
        $http.get('/contabilidad/libromayor/'+ cuenta).success(function (resultado, status, headers, config) {
            var sumadebe=0;
            var sumahaber=0;

            for (var i = 0; i < resultado.debe.length; i++) {
                sumadebe = sumadebe +resultado.debe[i].cantidad;
            }
            for (var j = 0; j < resultado.haber.length; j++) {
                sumahaber = sumahaber + resultado.haber[j].cantidad;
            }

            var saldo = sumadebe - sumahaber;
          
        


        if (saldo >= (rol.sueldo + rol.comision)) {
            sueldocomision();
             rol.mes = mesConvertir(rol.mes);
        }else{

            alertify.alert("Mensaje","Fondos insuficientes, caja tiene "+"$"+saldo, function(){
                alertify.message('OK');
            });

        }

        });
  
    }

    //validación si la comisión es mayor al 20% del sueldo,  pasa a formar parte del sueldo
    function sueldocomision() {
        var porcentaje = (rol.comision/ rol.sueldo)*100;
        if (porcentaje > 20) {//reasignacion de valores     
                alertify.alert("Mensaje","Las comisiones superan el 20% con respecto al sueldo, se actualizará los nuevos datos. Pon guardar si estas de acuerdo con los nuevos valores", function () {
            });
            cambiarValores();
        }else{   
            $http.post('/roldepagos/guardar/', rol).success(function (data, status, headers, config) {
                $scope.respuesta = data;
                console.log("data",data);
                if (data.estado == 0) {
                    alertify.success("Exitoso, Imprima el reporte");
                    reporte();
                    $uibModalInstance.close();
                }
                if (data.estado == 2) {
                    alertify.error("Este mes ya esta cancelado");
                    data.mensaje
                  
                }
                console.log("data", data);
            });
        }
        
    }
    //===========Cambiar valores
    function cambiarValores() {
        rol.sueldo        = rol.sueldo + rol.comision;
        $scope.profesor.sueldo = rol.sueldo;


        rol.comision      = 0;
        $scope.comisiones = rol.comision;

        rol.iesstrabajador= ($scope.profesor.sueldo * 0.0945);
        $scope.iess = $scope.profesor.sueldo * 0.0945;
        var places = 2;
        var input =  $scope.iess;
        var factor = "1" + Array(+(places > 0 && places +1)).join("0");
        $scope.iess =  Math.round(input * factor) / factor;
        rol.iesstrabajador =  $scope.iess ;


        rol.iesspatrono   =rol.sueldo * 0.1115;
        places = 2;
        input =  $scope.iess;
        factor = "1" + Array(+(places > 0 && places +1)).join("0");
        rol.iesstrabajador =  Math.round(input * factor) / factor;        
    }
    //=========Asignar Valor un constructor
    function asignarvalor() {
        if (rol.sueldo == undefined)      {rol.sueldo=0}
        if (rol.comision == undefined)    {rol.comision=0}
        if (rol.iesstrabajador == undefined) {rol.iesstrabajador=0}
        if (rol.prestamo == undefined)       {rol.prestamo=0}

        //=====decimales iess trabajador
        var places = 2;
        var input = rol.iesstrabajador;
       
        var factor = "1" + Array(+(places > 0 && places +1)).join("0");
        rol.iesstrabajador =  Math.round(input * factor) / factor;
        //======decimales iess patrono
        input = rol.iesspatrono;
        factor = "1" + Array(+(places > 0 && places +1)).join("0");
        rol.iesspatrono =  Math.round(input * factor) / factor;
        //==llamar funcion convertir el mes 
       
    
    };
    //======Convertir Mes Letras => Número ====
    
    function mesConvertir(ames) {
        var mes = -1;
        for (var i = 0; i < $scope.meses.values.length; i++) {
            if ($scope.meses.values[i] == ames) {mes=i+1};
        }
        return(mes);
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

        doc.text(x, y ,     "Nombres : " + ($scope.profesor.nombre +" " + $scope.profesor.apellido));
        doc.text(x, y +10 , "Cargo  : " + ($scope.profesor.cargo) );
        doc.text(x, y +20,  "Cédula :" + $scope.profesor.cedula);

        doc.text(x+90,y,"Atentido por : Carolina Alban");
        doc.text(x+90,y+10, "Fecha de emisión : "+ $scope.fecha);
        doc.text(x+90,y+20, "Mes: "+ $scope.meses.value);

        y=y+25;
        doc.setLineWidth(1);
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
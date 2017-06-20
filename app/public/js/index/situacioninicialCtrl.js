 'use strict';

angular.module('App')
  .controller('situacioninicialCtrl', function ($scope,$http, $uibModal, $log) {

    var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
    
    //listar estudiante
    $scope.open = function () {
        var size= 'lg';
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/index/modalNuevoESI.html',
            controller: "ModalNuevoESICtrl",
            size: size,
        });

        modalInstance.result.then(function () {
            getSituacionInicial(); 
        });
    };

    function getSituacionInicial() {
        $http.get('/contabilidad/situacioninicial/list' ).success(function (data) {
            $scope.esi = data;
            $scope.anc =[];
            $scope.ac  =[];
            //

            for (var i = 0; i < $scope.esi.activo.length; i++) {  
                
                //activo no corriente

                if ($scope.esi.activo[i].codigoCuenta.substr(0,3) =="1.2") {
                    $scope.anc.push($scope.esi.activo[i]);   
                }
                //activo corriente
                if ($scope.esi.activo[i].codigoCuenta.substr(0,3) =="1.1") {
                    $scope.ac.push($scope.esi.activo[i]); 
                }
            }
      





            //sumatoria
            $scope.sactivo=0;
            for (var i = 0; i < data.activo.length; i++) {
                $scope.sactivo = $scope.sactivo + data.activo[i].cantidad;
            }
        

            $scope.spasivo=0;
            for (var i = 0; i < data.pasivo.length; i++) {
                $scope.spasivo = $scope.spasivo + data.pasivo[i].cantidad;
            }

            $scope.spatrimonio=0;
            for (var i = 0; i < data.patrimonio.length; i++) {
                $scope.spatrimonio = $scope.spatrimonio + data.patrimonio[i].cantidad;
            }

        });
    };

    getSituacionInicial();

    $scope.openeditar = function () {
     


        var size= 'lg';
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/index/modalEditarESI.html',
            controller: "ModalEditarESICtrl",
            size: size,
        });

        modalInstance.result.then(function () {
            getSituacionInicial(); 
        });  
    };


    //================Reporte===========
    $scope.reporte2 = function () {
        /*
        $http.get('/contabilidad/situacioninicial/reporte').success(function (data) {
            location.href = '/contabilidad/situacioninicial/reporte';
        });
        */
    };



    $scope.reporte = function(){
    
        
        $http.get('/contabilidad/situacioninicial/list' ).success(function (data) {
            $scope.activo = data.activo;       
            $scope.pasivo = data.pasivo;
            $scope.patrimonio = data.patrimonio;    
            

            var doc = new jsPDF({
                //orientation: 'landscape'
            });
            doc.setFontSize(16);
            doc.setFontType("bolditalic");
            doc.text(80 , 20 , "Fundación 'JASPE'");
            doc.text(70 , 30 , "Estado de Situación Inicial");
            doc.text(75 , 40 , "Al 2 De Enero del 2017");
            doc.setFontSize(10);
            doc.setFontType("");
            //============Activo
            doc.text(20, 60 , "ACTIVO");

            var x= 20, y=70;
            var sumaActivo=0;
            for (var i = 0; i < $scope.activo.length; i++) {
                y=y+10;
                var auxActDet = $scope.activo[i].cuenta.toUpperCase();
                doc.text(x, y , auxActDet);


                var auxActCan =  $scope.activo[i].cantidad;
                sumaActivo = sumaActivo + auxActCan;
                auxActCan=auxActCan.toString();
                doc.text(x+40, y , "$" + auxActCan);

            }

            //============Pasivo
            doc.text(90, 60 , "PASIVO");
            x= 90, y=70;
            var sumaPasivo=0;
            for (var i = 0; i < $scope.pasivo.length; i++) {
                y=y+10;
                var auxPasDet = $scope.pasivo[i].cuenta.toUpperCase();
                doc.text(x, y , auxPasDet);              

                var auxPasCan =  $scope.pasivo[i].cantidad;
                sumaPasivo = sumaPasivo + auxPasCan;
                auxPasCan=auxPasCan.toString();
                doc.text(x + 65, y , "$" + auxPasCan);
                
            }
            y=y + 10;
            doc.text(x , y, "____________________________________________");
            y =y +10 ;
            doc.text(x , y, "Total Pasivo");
            doc.text(x + 65, y  , "$" + sumaPasivo.toString());
            //==============Patrimonio
            x= 90;
            y=y+20;
            var sumaPatrimonio=0;
            doc.text(x, y, "PATRIMONIO");
            y=y+10;
            for (var i = 0; i < $scope.patrimonio.length; i++) {
                
                y=y+10;
                var auxPatDet = $scope.patrimonio[i].cuenta.toUpperCase();
                doc.text(x, y , auxPatDet); 

                var auxPatCan = $scope.patrimonio[i].cantidad;
                sumaPatrimonio = sumaPatrimonio + auxPatCan;
                auxPatCan = auxPatCan.toString();
                doc.text(x + 65 , y , "$" + auxPatCan); 
                
            }
            y=y + 10;
            doc.text(x , y, "____________________________________________");
            y=y+10;
            doc.text(x , y, "Total Patrimonio");
            doc.text(x + 65, y  , "$" + sumaPatrimonio.toString());
            //==================Total
            

            doc.setFontType("bold");
            y=y+20;
            doc.text(x , y, "T Pasivo + T Patrimonio");
            doc.text(x + 65, y  , "$" + (sumaPasivo + sumaPatrimonio).toString());
            x=20;
            doc.text(x , y, "Total Activo");
            doc.text(x + 40 , y  , "$" + sumaActivo.toString());

            doc.setLineWidth(1);
            doc.line(x, y- 10 , x + 150, y- 10 );
           

            // doc.autoPrint()
            doc.save('estadosiuacion.pdf');

        });
        
    };

  });
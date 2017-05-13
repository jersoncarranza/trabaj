 'use strict';

angular.module('App')
  .controller('librodiarioCtrl', function ($scope,$http, $uibModal, $log) {
    var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}}; 
    
            $scope.totalhaber=0;
            $scope.totaldebe=0;
    //listar estudiante
    function GetLibroDiario() {
        $http.get('/contabilidad/librodiario/list').success(function (data, status, headers, config) {
            $scope.diario = data;
             var fecha;
            for (var i = 0 ; i < data.length; i++) {
                fecha = data[i].fecha;
                fecha = fecha.substr(0,10);
                $scope.diario[i].fecha = fecha.substr(0,10);
            }

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].debe.length; j++) {
                    $scope.totaldebe = $scope.totaldebe+ data[i].debe[j].cantidad;
                }

                for (var k = 0; k < data[i].haber.length; k++) {
                    $scope.totalhaber = $scope.totalhaber +data[i].haber[k].cantidad;
                }
            }
          
        })
        .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<br />status: " + status +
                "<br />headers: " + jsonFilter(header) +
                "<br />config: " + jsonFilter(config);
        });
    };
    GetLibroDiario();

    $scope.descargar = function(datos){
        var x= 10, y=20;
        var cantidad;
        var num=1;
        var guion="-";
        var doc = new jsPDF();
        for (var i = 0 ; i < datos.length; i++) {
                doc.setFontSize(12);
                
                var aux = num.toString();
                var res = guion.concat(aux);
                res=res.concat(guion);

                doc.text(x +80, y , res);
                cantidad =datos[i].fecha;
                cantidad=cantidad.toString();
             
                doc.text(x , y , cantidad);
        
            for (var j = 0 ; j < datos[i].debe.length; j++) {
                y = y +5;
  
                doc.text(x + 40 , y , datos[i].debe[j].detalle);
                cantidad = datos[i].debe[j].cantidad;
                cantidad = cantidad.toString();
                doc.text(x + 150, y , cantidad);
            }                   
            
            for (var k = 0 ; k < datos[i].haber.length; k++) {
                
                y=y+5;
                doc.text(x+60,y, datos[i].haber[k].detalle);
                cantidad = datos[i].haber[k].cantidad;
                cantidad= cantidad.toString();
                doc.text(x+170,y ,  cantidad );
            }     
            y=y+10;
            num=num+1;
        }

        doc.save('libd.pdf');
    };

  });
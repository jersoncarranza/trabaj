'use strict';
angular.module('App')
    .controller('graficosgastosCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

    disparador();
    function disparador() {
       
        $http.get('/roldepagos/fecha2').success(function (data) {
            grafico(data);
        });
    };


    function grafico(datos) {

       var salesChart = new FusionCharts({
        type: 'scrollline2d',
        dataFormat: 'json',
        renderAt: 'chartContainer30',
        width: '680',
        id: 'id-chartContainer30',
        height: '350',
        dataSource: {
            "chart": {
                "caption": "Sueldos de Profesores",
                "subCaption": "(Enero - Diciembre 2017)",
                "xAxisName": "Mes",
                "yAxisName": "Sueldo",
                "showValues": "0",
                "numberPrefix": "$",
                "showBorder": "0",
                "showShadow": "0",
                "bgColor": "#ffffff",
                "paletteColors": "#008ee4",
                "showCanvasBorder": "0",
                "showAxisLines": "0",
                "showAlternateHGridColor": "0",
                "divlineAlpha": "100",
                "divlineThickness": "1",
                "divLineIsDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "lineThickness": "3",  
                "flatScrollBars": "1",
                "scrollheight": "10",
                "numVisiblePlot": "12",
                "showHoverEffect":"1"
            },
            "categories": [
                {
                    "category": datos
                }
            ],
            "dataset": [
                {
                    "data": datos
                }
            ]
        }
    }).render();
    };

      $scope.descargar = function() {
         FusionCharts.batchExport({
            "charts": [{
              "id": "id-chartContainer30",
            }
            ],
            "exportFileName": "batchExport",
            "exportFormats": "png",
            "exportAtClientSide": "1"
          })
    }
	 

}]);
 'use strict';
angular.module('App')
  .controller('graficoscursosCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

    disparador();
    function disparador() {
       
         $http.get('/estudiantes/contar/').success(function (data) {
            $scope.cursos=data;
             grafico(data);
             graficoPastel(data);
        });
    };

    function grafico(datos) {

        var revenueChart = new FusionCharts({
            "id": "chart-1",
            "yAxisName": "Revenues",
            "type": "column3d",
            "renderAt": "chartContainer",
            "width": "500",
            "height": "300",
            "dataFormat": "json",
            "dataSource":  {
                "chart": {
                    "rotateYAxisName": "true",
                    "caption": "Estudiantes",
                    "subCaption": "Número de alumnos por cursos",
                    "xAxisName": "Cursos",
                    "yAxisName": "Estudiantes",
                    "theme": "fint",
                    "paletteColors": "#0075c2",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
                    "showCanvasBorder": "0",
                    "usePlotGradientColor": "0",
                    "plotBorderAlpha": "10",
                    "placeValuesInside": "1",
                    "valueFontColor": "#ffffff",
                    "showAxisLines": "1",
                    "axisLineAlpha": "25",
                    "divLineAlpha": "10",
                    "alignCaptionWithCanvas": "0",
                    "showAlternateVGridColor": "0",
                    "captionFontSize": "14",
                    "subcaptionFontSize": "14",
                    "subcaptionFontBold": "0",
                    "toolTipColor": "#ffffff",
                    "toolTipBorderThickness": "0",
                    "toolTipBgColor": "#000000",
                    "toolTipBgAlpha": "80",
                    "toolTipBorderRadius": "2",
                    "toolTipPadding": "5"
                 },
                 "data": datos
              }

          });
        revenueChart.render();
    };

    function graficoPastel(datos) {
        var revenueChart = new FusionCharts({
        id: "chart-2",
        yAxisName: "Revenues",
        type: 'doughnut3d',
        renderAt: 'chart-container',
        width: '500',
        height: '300',
        dataFormat: 'json',
        exportEnabled :"1",
        dataSource: {
            "chart": {
                "caption": "Estudiantes",
                "subCaption": "Porcentaje de alumnos por cursos",
                "numberPrefix": "$",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "0",
                "showShadow": "0",
                "enableSmartLabels": "0",
                "startingAngle": "310",
                "showLabels": "0",
                "showPercentValues": "1",
                "showLegend": "1",
                "legendShadow": "0",
                "legendBorderAlpha": "0",                                
                "decimals": "0",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
            },
            "data": datos
        }
    }).render();

    }


    $scope.descargar = function() {
         FusionCharts.batchExport({
            "charts": [{
              "id": "chart-1",
            }, {
              "id": "chart-2",
            }],
            "exportFileName": "batchExport",
            "exportFormats": "png",
            "exportAtClientSide": "1"
          })
    }
}]);
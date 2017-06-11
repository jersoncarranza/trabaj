 'use strict';
angular.module('App')
  .controller('cursosgananciaCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

    var barra=[];
    var g1=[];
    var g2=[];
    var g3=[];
    var g4=[];
    disparador();

    function disparador() {
       
         $http.get('/estudiantes/contar/').success(function (data) {
            $scope.cursos=data;
            var matricula=0;
            var mensual=0;

            for (var i = 0; i < data.length; i++) {
                barra.push({
                    value:data[i].mensual+data[i].matricula,
                    label:data[i].label
                });

                g1.push({
                    value:data[i].matricula,
                    label:data[i].label
                });

                 g2.push({
                    value:data[i].mensual,
                    label:data[i].label
                });
                 //mensual y matricula
                mensual   = mensual+data[i].mensual;
                matricula = data[i].matricula+matricula;
            }
            
            g3.push({
                value:mensual,
                label:"Pensión"
            });

            g3.push({
                value:matricula,
                label:"Matrícula"
            });
            
            console.log("pedazo",g3);
            grafico(barra);
            grafico2(g1,g2);
            grafico3(g3);
        });
    };

    function grafico(barra) {
        var revenueChart = new FusionCharts({
           
        "id": "chart-3",
        "yAxisName": "Revenues",
        "type": "column3d",
        "renderAt": "chartContainer2",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
         "dataSource":  {
            "chart": {
                "rotateYAxisName": "Boolean",
                "caption": "Cursos",
                "subCaption": "Ingresos de los Cursos",
                "yAxisName": "Ingresos (In USD)",
                "numberPrefix": "$",
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
            "data": barra
        }
        });
        revenueChart.render();
    };


    function grafico2(data1,data2) {
        var revenueChart = new FusionCharts({
           
        "id": "chart-4",
        "yAxisName": "Revenues",
        "type": "mscolumnline3d",
        "renderAt": "chartContainer3",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "caption": "Cursos",
                "subCaption": "Detalles de los ingresos",
                "xAxisName": "Cursos",
                "yAxisName": "Ingresos (In USD)",
                "numberPrefix": "$",
                "paletteColors": "#0075c2,#1aaf5d",
                "bgColor": "#ffffff",
                "showAlternateHGridColor": "0",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "baseFontColor": "#333333",
                "baseFont": "Helvetica Neue,Arial",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "usePlotGradientColor": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "legendBgAlpha": "0",
                "legendBorderAlpha": "0",
                "legendShadow": "0",
                "legendItemFontSize": "10",
                "legendItemFontColor": "#666666",
                "legendCaptionFontSize": "9",
                "divlineAlpha": "100",
                "divlineColor": "#999999",
                "divlineThickness": "1",
                "divLineDashed": "1",
                "divLineDashLen": "1"
            },
            "categories": [
                {
                    "category": data1
                }
            ],
            "dataset": [
                {
                    "seriesname": "Matrícula ",
                    "allowDrag": "0",
                    "data":data1
                },
                {
                    "seriesname": "Pension",
                    "dashed": "0",
                    "data": data2
                }
            ]
        }

        });
        revenueChart.render();
    };

    function grafico3(barra) {
        var revenueChart = new FusionCharts({
           
        "id": "chart-9",
        "yAxisName": "Revenues",
        "type": "column3d",
        "renderAt": "chartContainer9",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
         "dataSource":  {
            "chart": {
                "rotateYAxisName": "Boolean",
                "caption": "Cursos",
                "subCaption": "Ingresos de Matrícula y Pensiones",
                "yAxisName": "Ingresos (In USD)",
                "numberPrefix": "$",
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
            "data": barra
        }
        });
        revenueChart.render();
    };

    $scope.descargar = function() {
         FusionCharts.batchExport({
            "charts": [
            {
              "id": "chart-9",
            },
            {
              "id": "chart-3",
            },
            {
              "id": "chart-4",
            }],
            "exportFileName": "batchExport",
            "exportFormats": "png",
            "exportAtClientSide": "1"
          })
    }
  
}]);

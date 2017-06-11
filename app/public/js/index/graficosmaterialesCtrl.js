 'use strict';
angular.module('App')
  .controller('graficosmaterialesCtrl', [ '$scope','$http','$uibModal', function ($scope,$http,$uibModal) {

 
    var g1=[];
    var g2=[];
    var g3=[];
    var g4=[];
    disparador();

    function disparador() {
        var compras=0; 
        var ventas =0; 
        $http.get('/material/listar').success(function (data) {

            for (var i = 0; i < data.length; i++) {
                compras=compras+data[i].compras;
                ventas=ventas+data[i].ventas;

                g2.push({
                    label:data[i].nombre,
                    value:data[i].ventas
                });

                g3.push({
                    label:data[i].nombre,
                    value:data[i].compras
                });
                g4.push({
                    label:data[i].nombre
                })
            }
            
            g1.push({
                value:compras,
                label:"compras"
            });
            g1.push({
                value:ventas,
                label:"ventas"
            });
            grafico1(g1);
            grafico2(g1);
            grafico3(g2,g3,g4);
        });
    };

    function grafico1(barra) {
        var revenueChart = new FusionCharts({
           
        "id": "chart-20",
        "yAxisName": "Revenues",
        "type": "column3d",
        "renderAt": "chartContainer20",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
         "dataSource":  {
            "chart": {
                "rotateYAxisName": "Boolean",
                "caption": "Mercadería",
                "subCaption": "Compra y venta de mercadería",
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


    function grafico2(datos) {
        var revenueChart = new FusionCharts({
        id: "chart-21",
        yAxisName: "Revenues",
        type: 'doughnut3d',
        renderAt: 'chartContainer21',
        width: '500',
        height: '300',
        dataFormat: 'json',
        exportEnabled :"1",
        dataSource: {
            "chart": {
                "caption": "Mercadería",
                "subCaption": "Porcentajes de compra y venta de mercadería",
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
    };
    
    function grafico3(data1,data2,data3) {
        var revenueChart = new FusionCharts({
           
        "id": "chart-22",
        "yAxisName": "Revenues",
        "type": "mscolumnline3d",
        "renderAt": "chartContainer22",
        "width": "500",
        "height": "300",
        "dataFormat": "json",
        "dataSource": {
            "chart": {
                "caption": "Mercadería",
                "subCaption": "Detalles de los ingresos de mercadería",
                "xAxisName": "Materiales",
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
                    "seriesname": "Ventas ",
                    "allowDrag": "0",
                    "data":data1
                },
                {
                    "seriesname": "Compras",
                    "dashed": "0",
                    "data": data2
                }
            ]
        }

        });
        revenueChart.render();
    };
        
    $scope.descargar = function() {
         FusionCharts.batchExport({
            "charts": [{
              "id": "chart-20",
            }, {
              "id": "chart-21",
            }, {
              "id": "chart-22",
            }],
            "exportFileName": "batchExport",
            "exportFormats": "png",
            "exportAtClientSide": "1"
          })
    };
  
}]);

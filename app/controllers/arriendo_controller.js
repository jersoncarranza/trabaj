var arriendoQuery 	= require("../models/qarriendo.js");
var libroDiario     = require("../models/qLibroDiario");

exports.new = function (req, res, next) {
	var data = req.body;
	var mes = data.meses;
	var aio = data.anio;
	var respuesta =[];
	arriendoQuery.verificar(mes, aio, function (err,doc) {
		if (doc == "") {

			var asiento ={ //datos para el libro diario
					//fecha: data.fecha_matricula,
					descripcion:"Pago de arriendo mes de " + data.meses,
					debe:[{
						codigo_cuenta:"2.3.2.2",
						detalle:"pago arriendo",
						cantidad: data.cantidad 
						}],
					haber:[{
						codigo_cuenta:"1.1.1.1",
						detalle:"caja",
						cantidad: data.cantidad 
					}],
					sugerencia:"Pago de arriendo",
				}
			libroDiario.createAsiento(asiento, function(error,docu){});
			arriendoQuery.createArriendo(data, function (err, doc) {
				respuesta={
					estado:0,
					mensaje:"Se registro con éxito"
				}
				res.json(respuesta);
			});
		}else{//no se guardo
			respuesta={
				estado:1,
				mensaje:"Ya pagaste ese mes"
			}
			res.json(respuesta);
		}
	});
};

exports.list = function (req, res, next) {
	arriendoQuery.getallArriendo(function (err, doc) {
		res.json(doc);
	});
};
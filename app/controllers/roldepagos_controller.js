var rolQuery 	= require("../models/qrolpagos.js");
var libroDiario	= require("../models/qLibroDiario.js");

exports.guardar = function (req, res, next) {
	var data = req.body;
	var data_res;

	rolQuery.existeRol(data, function (err, doc) {
		//console.log("doc", data);
		if (doc == "") {
			rolQuery.createRol(data, function (err, doc) {
				if (!err) {
					data_res={
						doc:doc,
						estado:0,

						mensaje:"Se guardó con exitó"
					}
					//-----------Trabajador-----------//
					var asiento = {
						descripcion:"pagos de sueldos",
						debe:[{
							codigo_cuenta:"4.1.1",
							detalle:"sueldos y salarios",
							cantidad: data.sueldo - data.iesstrabajador, 
						},{
							codigo_cuenta:"4.1.2",
							detalle:"aporte iess",
							cantidad: data.iesstrabajador
						}],
						haber:[{
						codigo_cuenta:"1.1.1.1",
						detalle:"caja",
						cantidad: data.sueldo 
						}],
						sugerencia:"Pago" + data.cedula,

					}

					libroDiario.createAsiento(asiento, function (errl, docl) {});
					//<----------Trabajador--------->//
					//-----------Patrono-----------//
					asiento = {
						descripcion:"Aporte Patrono",
						debe:[{
							codigo_cuenta:"4.1.3",
							detalle:"aporte iess patrono",
							cantidad: data.iesspatrono, 
						}],
						haber:[{
						codigo_cuenta:"1.1.1.1",
						detalle:"caja",
						cantidad: data.iesspatrono 
						}],
						sugerencia:"Aporte" + data.cedula,

					}
					libroDiario.createAsiento(asiento, function (errp, docp) {});
					//<-----------Patrono----------->//

					res.json(data_res);
				}else{
					data_res={
						estado:1,
						mensaje: "Error"
					}
					res.json(data_res);
				}
			})
		}else{
			data_res={
				estado:2,
				mensaje: "Repetido"
			}
			res.json(data_res);
		}
	});
}

//Mostrar por cedula
exports.mostrarCedula = function (req, res, next) {
	var cedula = req.params.cedula;
	rolQuery.cedulaRol(cedula, function (err, doc) {
		if (doc != []) {
			res.json(doc);
		}else{
			var resp={
				estado:1,
				mensaje:"No existe ningun rol"
			}
			res.json(resp);
		}
	});

};
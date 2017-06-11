var rolQuery 	= require("../models/qrolpagos.js");
var libroDiario	= require("../models/qLibroDiario.js");
var librodiarioController	= require("./LibroDiario_controller.js");

exports.guardar = function (req, res, next) {
	var data = req.body;
	var data_res;
	var cuenta="1.1.1.1";

	
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
						sugerencia:"pagos de sueldos",
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
						descripcion:"Pago" + data.cedula,

					}

					libroDiario.createAsiento(asiento, function (errl, docl) {});
					//<----------Trabajador--------->//
					//-----------Patrono-----------//
					asiento = {
						sugerencia:"Aporte Patrono",
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
						descripcion:"Aporte" + data.cedula,

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

//mostrar roles de pagos por fechas
exports.rolFecha=function (req, res, next) {

	rolQuery.rolFecha(function (err, doc) {
		res.json(doc);
	})
};

//mostar
exports.rolFecha2=function (req, res, next) {
	var respuesta=[];
	rolQuery.enero(function (err, doc) {
		var mes=0;
		for (var i = 0; i < doc.length; i++) {
			mes=mes+doc[i].sueldo;
		}
		respuesta.push({
			label:"enero",
			value:mes
		})
		

		rolQuery.febrero(function (err, doc) {
			var mes=0;
			for (var i = 0; i < doc.length; i++) {
				mes=mes+doc[i].sueldo;
			}
			respuesta.push({
				label:"febrero",
				value:mes
			})
			
			rolQuery.marzo(function (err, doc) {
				var mes=0;
				for (var i = 0; i < doc.length; i++) {
					mes=mes+doc[i].sueldo;
				}
				respuesta.push({
					label:"marzo",
					value:mes
				})
				rolQuery.abril(function (err, doc) {
					var mes=0;
					for (var i = 0; i < doc.length; i++) {
						mes=mes+doc[i].sueldo;
					}
					respuesta.push({
						label:"abril",
						value:mes
					})
					rolQuery.mayo(function (err, doc) {
						var mes=0;
						for (var i = 0; i < doc.length; i++) {
							mes=mes+doc[i].sueldo;
						}
						respuesta.push({
							label:"mayo",
							value:mes
						})
						rolQuery.junio(function (err, doc) {
							var mes=0;
							for (var i = 0; i < doc.length; i++) {
								mes=mes+doc[i].sueldo;
							}
							respuesta.push({
								label:"junio",
								value:mes
							})
							rolQuery.julio(function (err, doc) {
								var mes=0;
								for (var i = 0; i < doc.length; i++) {
									mes=mes+doc[i].sueldo;
								}
								respuesta.push({
									label:"julio",
									value:mes
								})
								rolQuery.agosto(function (err, doc) {
									var mes=0;
									for (var i = 0; i < doc.length; i++) {
										mes=mes+doc[i].sueldo;
									}
									respuesta.push({
										label:"agosto",
										value:mes
									})
										rolQuery.septiembre(function (err, doc) {
										var mes=0;
										for (var i = 0; i < doc.length; i++) {
											mes=mes+doc[i].sueldo;
										}
										respuesta.push({
											label:"septiembre",
											value:mes
										})
										rolQuery.octubre(function (err, doc) {
											var mes=0;
											for (var i = 0; i < doc.length; i++) {
												mes=mes+doc[i].sueldo;
											}
											respuesta.push({
												label:"octubre",
												value:mes
											})
											rolQuery.noviembre(function (err, doc) {
												var mes=0;
												for (var i = 0; i < doc.length; i++) {
													mes=mes+doc[i].sueldo;
												}
												respuesta.push({
													label:"noviembre",
													value:mes
												})
												rolQuery.diciembre(function (err, doc) {
													var mes=0;
													for (var i = 0; i < doc.length; i++) {
														mes=mes+doc[i].sueldo;
													}
													respuesta.push({
														label:"diciembre",
														value:mes
													})
													res.json(respuesta);
												});//diciembre
											});//noviembre
										});//octubre
									});//septiembre
								});//agosto
							});//julio
						});//junio
					});//mayo
				});//abril
			});//marzo
		});//febrero
	});//enero
};

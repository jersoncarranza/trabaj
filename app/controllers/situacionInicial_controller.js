var situacionInicial 	= require("../models/qsituacionInicial.js");
var libroDiarioQuery 	= require("../models/qLibroDiario.js");
var request				= require('request');

exports.list = function(req, res, next){
	situacionInicial.listEsi(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

//Nuevo
exports.new = function (req, res, next) {
	var data_res;
	var data = req.body;
	console.log(data);
	
	situacionInicial.removeEsi(function (err, doc) {
		situacionInicial.createEsi(data, function (err, doc) {
			var id =  doc._id;
			if (!err) {

				libroDiarioQuery.removeESI(function (err, doc2) {});
				esiNuevoLibroDiario(id, data);
				data_res={
					estado:0,
					mensaje:"correctamente ingresado",
					res:doc
				}
				res.json(data_res);
			}else{
				data_res={
					estado:1,
					mensaje:"Error",
					res:doc
				}
				res.json(data_res);
			}
		})
	});
};

exports.edit = function (req, res, next) {
	var id = req.params.id;
	var data_res;
	var data = req.body;

		
	situacionInicial.actualizarEsi(id, data, function (err, doc) {
		if (!err) {
			data_res={
				estado:0,
				mensaje:"correctamente modificado",
				res:doc
			}
			esiLibroDiario(id,data);
			res.json(data_res);
		}else{
			data_res={
				estado:1,
				mensaje:"Error",
				res:doc
			}
			res.json(data_res);
		}
	});	
};

exports.reporte = function (req, res, next) {
	situacionInicial.listEsi(function (err, docs){
		var data = {
				template:{'shortid':'r1tpwHm6g'},
				options:{preview:false},
				data:{"esi": docs}
			}
		
		var options = {
			uri: 'http://localhost:8001/api/report',
			method: 'POST',
			json: data
		}

		request(options).pipe(res);

	});
};

function esiLibroDiario(id, data) {
	var debe=[];
	var haber=[];

	for (var i = 0; i < data.activo.length; i++) {
		debe.push({
			codigo_cuenta:data.activo[i].codigoCuenta,
			detalle:data.activo[i].cuenta,
			cantidad:data.activo[i].cantidad
		})
	}
	
	for (var i = 0; i < data.pasivo.length; i++) {
		haber.push({
			codigo_cuenta:data.pasivo[i].codigoCuenta,
			detalle:data.pasivo[i].cuenta,
			cantidad:data.pasivo[i].cantidad
		})
	}

	for (var i = 0; i < data.patrimonio.length; i++) {
		haber.push({
			codigo_cuenta:data.patrimonio[i].codigoCuenta,
			detalle:data.patrimonio[i].cuenta,
			cantidad:data.patrimonio[i].cantidad
		})
	}
	
	var asientoLibroDiario = {
		prioridad: 1,
		esi:id,
		descripcion:"Estado de situación inicial",
		debe :debe,
		haber:haber,
		sugerencia:"Estado de situación inicial"
	}

	libroDiarioQuery.editESI(id, asientoLibroDiario, function (err, doc) {
		console.log(doc);
	});
};

function esiNuevoLibroDiario(id, data) {
	var debe=[];
	var haber=[];

	for (var i = 0; i < data.activo.length; i++) {
		debe.push({
			codigo_cuenta:data.activo[i].codigoCuenta,
			detalle:data.activo[i].cuenta,
			cantidad:data.activo[i].cantidad
		})
	}
	
	for (var i = 0; i < data.pasivo.length; i++) {
		haber.push({
			codigo_cuenta:data.pasivo[i].codigoCuenta,
			detalle:data.pasivo[i].cuenta,
			cantidad:data.pasivo[i].cantidad
		})
	}

	for (var i = 0; i < data.patrimonio.length; i++) {
		haber.push({
			codigo_cuenta:data.patrimonio[i].codigoCuenta,
			detalle:data.patrimonio[i].cuenta,
			cantidad:data.patrimonio[i].cantidad
		})
	}
	
	var asientoLibroDiario = {
		prioridad: 1,
		esi:id,
		descripcion:"Estado de situación inicial",
		debe :debe,
		haber:haber,
		sugerencia:"Estado de situación inicial"
	}

	libroDiarioQuery.createAsiento(asientoLibroDiario, function (err, doc) {
	});
};


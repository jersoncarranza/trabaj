var LibroDiarioQuery 	= require("../models/qLibroDiario.js");


exports.list = function(req, res, next){
	LibroDiarioQuery.list(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

exports.listESI = function (req, res, next) {
	LibroDiarioQuery.listESI(function (err, docs) {
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

exports.cuenta = function (req, res, next) {
	var cuenta = req.params.cuenta;
	cuenta = cuenta.toLowerCase();
	LibroDiarioQuery.buscarCuenta(cuenta, function (err, docs) {
		if(!err){


			var totaldebe=0;
			var totalhaber=0;
			for (var i = 0; i < docs.length; i++) {

				//=========Debe
				for (var j = 0; j < docs[i].debe.length; j++) {
					if (docs[i].debe[j].detalle == cuenta || docs[i].debe[j].codigo_cuenta == cuenta) {
						totaldebe = totaldebe +docs[i].debe[j].cantidad;
					}
					
				}
				//========Haber
				for (var j = 0; j < docs[i].haber.length; j++) {
					if (docs[i].haber[j].detalle == cuenta || docs[i].haber[j].codigo_cuenta == cuenta) {
						totalhaber = totalhaber +docs[i].haber[j].cantidad;
					}
					
				}
				//=========
			};
			
			var respuesta ={
				debe:totaldebe,
				haber:totalhaber
			}
			res.json(respuesta);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};
//buscar cuenta fecha


exports.mayor = function (req, res, next) {
	var cuenta = req.params.cuenta;
	cuenta = cuenta.toLowerCase();

	LibroDiarioQuery.buscarCuenta(cuenta, function (err, docs) {
		if(!err){
			var totaldebe=0;
			var totalhaber=0;

			var debe = [] ;

			var haber=[];

			for (var i = 0; i < docs.length; i++) {

				//=========Debe
				for (var j = 0; j < docs[i].debe.length; j++) {

					if (docs[i].debe[j].detalle == cuenta || docs[i].debe[j].codigo_cuenta == cuenta) {
						
						debe.push({
							asiento:i,
							cantidad: docs[i].debe[j].cantidad,
							fecha:  docs[i].fecha
						});
					}
					
				}
				//========Haber
				for (var j = 0; j < docs[i].haber.length; j++) {
					if (docs[i].haber[j].detalle == cuenta || docs[i].haber[j].codigo_cuenta == cuenta) {
						haber.push({
							asiento:i,
							cantidad: docs[i].haber[j].cantidad,
							fecha: docs[i].fecha
						});
					}
					
				}
				//=========
			};
			var respuesta ={
				debe:debe,
				haber:haber
			}
			res.json(respuesta);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

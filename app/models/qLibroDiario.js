var modelsLibroDiario = require('./schema/LibroDiario');

//crear un asiento
exports.createAsiento = function (asiento, callback) {
	let cdebe;
	let chaber;
	
	for (var i = 0; i < asiento.debe.length; i++) {
		cdebe = asiento.debe[i].cantidad + 0.00001;
		asiento.debe[i].cantidad  = cdebe.toFixed(2);
	}

	chaber = (asiento.haber.cantidad + 0.00001).toFixed(2);
	asiento.haber.cantidad = chaber;
	

	var LibroDiario =	new modelsLibroDiario.LibroDiario(asiento);
	LibroDiario.save(callback);
};

//listar todos los asientos
exports.list = function(callback){
	var query = {

	}
	var campos = {
		fecha:1,
		descripcion:1,
		debe:1,
		haber:1,
		sugerencia:1
	}
	modelsLibroDiario.LibroDiario.find(query, campos, callback).sort({fecha:1});
};

//Editar el Estado de Situacion Inicial
exports.editESI = function (id, data, callback) {
	for (var i = 0; i < data.debe.length; i++) {
		console.log(data.debe[i].cantidad);
	}
	var query = {esi:id};
	var campos = data;
	modelsLibroDiario.LibroDiario.update(query, {$set:campos}, callback);
};

//Eliminar el Estado de Situacion Inicial
exports.removeESI = function (callback) {
	var query = {prioridad:1};
	modelsLibroDiario.LibroDiario.remove(query, callback);
};

exports.listESI = function(callback){
	var query = {
		prioridad: 1
	}
	var campos = {
		fecha:1,
		descripcion:1,
		debe:1,
		haber:1,
		sugerencia:1
	}
	modelsLibroDiario.LibroDiario.find(query, campos, callback);
};


exports.buscarCuenta = function (cuenta, callback) {
	
	var query = {
		$or:[
			{"debe.detalle":cuenta},
			{"debe.codigo_cuenta":cuenta},
			{"haber.detalle":cuenta},
			{"haber.codigo_cuenta":cuenta},
			]
		}
	var campos = {
		fecha:1,
		"debe.detalle":1,
		"debe.cantidad":1,
		"debe.codigo_cuenta":1,
		"haber.detalle":1,
		"haber.cantidad":1,
		"haber.codigo_cuenta":1,
	}
	modelsLibroDiario.LibroDiario.find(query, campos, callback).sort({fecha:1});
};
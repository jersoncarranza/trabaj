var models = require('./schema/cuenta.js');

exports.createCuenta = function (newcuenta, callback) {
	var cuenta = new models.Cuenta(newcuenta);
	cuenta.save(callback);
};
//obtener todas las cuentas
exports.getallcuentas = function (callback) {
	var query = {};
	var campos = {
		nombrecuenta:1,
		codigocuenta:1
	};
	models.Cuenta.find(query, campos, callback).sort({codigocuenta:1});
};
//buscar por id 
exports.getidcuenta = function (id, callback) {
	var query= {_id:id};
	var campos={
		nombrecuenta:1,
		codigocuenta:1
	}
	models.Cuenta.findOne(query, campos, callback);
};
//buscar por id 
exports.getalltipocuenta = function (id, callback) {
	var query= {
		//codigocuenta:{$regex:id}
		codigocuenta:id
	};
	var campos={
		nombrecuenta:1,
		codigocuenta:1
	};
	models.Cuenta.find(query, campos, callback);
};

exports.removecuenta = function (id, callback) {
	var query = {_id: id};
	models.Cuenta.findOneAndRemove(query, callback);
};

exports.editcuentaid = function (id, data, callback) {
	var query = {_id:id};
	var campos= data;
	models.Cuenta.update(query, {$set: campos}, callback);
};
//buscar por cuenta
exports.getcodigocuenta = function (codigocuenta, callback) {
	var query= {codigocuenta:codigocuenta};
	var campos={
		nombrecuenta:1,
		codigocuenta:1
	}
	models.Cuenta.findOne(query, campos, callback);
};

//buscar por cuenta
exports.getnombrecuenta = function (nombrecuenta, callback) {
	var query= {nombrecuenta:nombrecuenta};
	var campos={
		nombrecuenta:1,
		codigocuenta:1
	}
	models.Cuenta.findOne(query, campos, callback);
};


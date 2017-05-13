var models = require('./schema/rolPagos.js');

exports.createRol = function (data, callback) {
	var query ={
		cedula : data.cedula,
		mes    : data.mes,
	}
	var rolPagos =	new models.rolPagos(data);
	rolPagos.save(query,callback);
};

//Buscar: Parametros Cedula y mes

exports.existeRol = function (data, callback) {

	
	var query ={
		cedula : data.cedula,
		mes    : data.mes
	}
	var campos = {
		cedula:1,
		mes:1
	}
	models.rolPagos.find(query, campos, callback);
}
//Buscar : PArametro cedula

exports.cedulaRol = function (cedula, callback) {
	console.log("cedula", cedula);
	var query ={
		cedula : cedula
	}
	var campos = {
		date:1, 
		cargo:1,
		cedula:1,
		comision:1,
		iesspatrono:1,
		iesstrabajador:1,
		mes:1,
		nombre:1,
		prestamo:1,
		sueldo:1
	}
	models.rolPagos.find(query, campos, callback).sort( { mes : 1});
}
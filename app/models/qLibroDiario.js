var modelsLibroDiario = require('./schema/LibroDiario');

//crear un asiento
exports.createAsiento = function (asiento, callback) {
	console.log("asienmto",asiento);
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


	modelsLibroDiario.LibroDiario.find(query, campos, callback);

};
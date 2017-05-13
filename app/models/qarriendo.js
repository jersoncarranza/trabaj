var models = require('./schema/arriendo.js'); 	
// Crear Arriendo
exports.createArriendo = function (newArriendo, callback) {
	var Arriendo = new models.Arriendo(newArriendo);
	Arriendo.save(callback);
};
//listar todos los meses cancelados
exports.getallArriendo = function (callback) {
	var query = {};
	var campos = {};
	models.Arriendo.find(query, campos, callback).sort({mesnumero:-1});
};

//
exports.verificar = function (mes, aio, callback) {
	var query = {
		anio:aio,
		meses:mes
	};
	var campos = {};
	models.Arriendo.find(query, campos, callback);
};
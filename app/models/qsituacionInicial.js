var models = require('./schema/situacioninicial.js');

//crear un Es
exports.createEsi = function (esi, callback) {
	var situacionInicial =	new models.situacionInicial(esi);
	situacionInicial.save(callback);
};

//listar todos los esis
exports.listEsi = function(callback){
	var query = {}
	var campos = {
		fecha:1,
		activo:1,
		pasivo:1,
		patrimonio:1
	}
	models.situacionInicial.find(query, campos, callback);
};

exports.actualizarEsi = function (id , data, callback) {
	var query = {_id:id};
	var campos = {
		activo		: data.activo,
		pasivo 		: data.pasivo,
		patrimonio  : data.patrimonio
	};
	models.situacionInicial.update(query, {$set:campos}, callback);
};
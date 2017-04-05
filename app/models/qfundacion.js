var models = require('./schema/fundacion.js'); 	
	
	// 
	exports.createFundacion = function (newFundacion, callback) {
		var Fundacion = new models.Fundacion(newFundacion);
		Fundacion.save(callback);
	};

	// 
	exports.getFundacion = function (callback) {
		var query = {};
		var campos = {};
		models.Fundacion.findOne(query, campos, callback);
	};

	//
	exports.editFundacion = function(id, data, callback){
		var query = {_id: id};
		var campos = data;
		models.Fundacion.update(query, {$set:campos}, callback);
	};
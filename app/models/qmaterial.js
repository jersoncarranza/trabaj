var models = require('./schema/material.js');

exports.createMaterial = function (data, callback) {
	var Material = new models.Material(data);
	Material.save(callback);
};
//listar todos materiale
exports.listMaterial = function (callback) {
	var query  = {};
	var campos = {};
	models.Material.find(query, campos, callback);	
};
//listar un material por id
exports.listIdMaterial = function (id, callback) {
	var query  = {_id:id};
	var campos = {};
	models.Material.findOne(query, campos, callback);
};
//Edita un material
exports.editarMaterial = function (id, data, callback) {
	var query  = {_id:id};
	models.Material.update(query, data, callback);
};

//
exports.ventaMaterial = function(id, data, callback){
	var query  = {_id:id};
	models.Material.update(query, data, callback);	
};
var models = require('./schema/curso.js'); 	
// Crear curso
exports.createCurso = function (newCurso, callback) {
	var Curso = new models.Curso(newCurso);
	Curso.save(callback);
};

// Obtener listado de todos los cursos
exports.getallCurso = function (callback) {
	var query = {};
	var campos = {};
	models.Curso.find(query, campos, callback).sort({date:-1});
};

// Obtener listado de todos los cursos
exports.getIdCurso = function (id, callback) {
	var query = {
		_id:id
	};
	var campos = {};
	models.Curso.find(query, campos, callback);
};

// Eliminar un curso
exports.removeCurso = function (id, callback) {
	var query = {_id: id};
	models.Curso.findOneAndRemove(query, callback);
};

// Editar un curso
exports.editCurso = function (id, data, callback) {
	var query = {_id: id};
	var campos = data;
	models.Curso.update(query, {$set:campos}, callback);
};
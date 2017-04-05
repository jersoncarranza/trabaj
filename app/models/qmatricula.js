//añadir un nuevo estudiante matriculado
var modelsMatricula = require('./schema/Matricula');
var modelsEstudiante = require('./schema/Estudiante');
var modelsCurso      = require('./schema/curso');



exports.createMatricula = function (matricula, callback) {
		
		var Matricula =  new modelsMatricula.Matricula(matricula);
		/*
		Matricula.save(
			modelsMatricula.Matricula.find({})
				.populate('estudiante')
				.exec(function(matricula){
					 console.log(JSON.stringify(matricula, null, "\t"))
				})
		)
		*/
		Matricula.save(callback);
};

//query de la verificación
exports.verificarMatricula = function (datos, callback) {


	var query = {
		estudiante:datos.estudiante,
		curso:datos.curso,
	}

	var campos = {
		nombrecurso: 1 ,
		fecha_matricula: 1 ,
		fechainiciocurso:1 ,
		precio: 1 ,
		estudiante: 1,
		curso:1
	}

	modelsMatricula.Matricula.findOne(query, campos , callback);

}
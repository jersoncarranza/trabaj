var EstudianteQuery 	= require("../models/qestudiante.js");

// listar todos los estudiante
exports.list = function(req, res, next){
	EstudianteQuery.listEstudiante(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

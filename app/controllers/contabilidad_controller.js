var contabilidad 	 = require("../models/qflujocaja.js");

exports.list = function(req, res, next){

	contabilidad.buscarCuenta(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};
var situacionInicial 	= require("../models/qsituacionInicial.js");

exports.list = function(req, res, next){
	situacionInicial.listEsi(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

exports.new = function (req, res, next) {
	var data_res;
	situacionInicial.createEsi(function (err, doc) {
		if (!err) {
			data_res={
				estado:0,
				mensaje:"correctamente ingresado",
				res:doc
			}
			res.json(data_res);
		}else{
			data_res={
				estado:1,
				mensaje:"Error",
				res:doc
			}
			res.json(data_res);
		}
	})
}
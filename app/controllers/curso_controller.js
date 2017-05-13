var CursoQuery 	= require("../models/qcurso.js");
var fs = require("fs.extra");

//añadir
exports.new = function (req, res, next) {
	var data_res;
	var data = req.body;
	var extension = req.body.file.name.split(".").pop();

	var data = {
		nombre:req.body.nombre,
		descripcion: req.body.descripcion,
		extension:extension,
		fecha_inicio:req.body.fecha_inicio,
		precio:req.body.precio,
		pension:req.body.pension,
		meses:req.body.meses

	}
	
	CursoQuery.createCurso(data, function (err, docs) {
		if(! err){
			fs.copy(req.body.file.path, "app/public/img/"+docs._id+"."+ extension);
			data_res={
				estado:0,
				mensaje: "Se guardó con exitó"
			}
			res.json(data_res);
		}
		else{
			data_res={
				estado:1,
				mensaje: "Error"
			}
			res.json(data_res);
		}
	});
	
};

//obtener todos cursos
exports.getall = function (req, res, next) {
	CursoQuery.getallCurso(function (err, docs) {
		res.json(docs);
	});
};
//obtener id 
exports.getid = function (req, res, next) {
	var id = req.params.id;
	CursoQuery.getIdCurso(id, function (err, docs) {
		res.json(docs);
	});
};


//Eliminar
exports.remove = function (req, res, next) {
	var id = req.params.id;
	var data_res;
	CursoQuery.removeCurso(id, function (err, docs) {
		if(!err){
			data_res={
				estado:0,
				mensaje: "Se eliminó con exitó"
			}
			res.json(data_res);
		}else{
			data_res={
				estado:0,
				mensaje: "Error no se pudo eliminar"
			}
			res.json(data_res);
			//res.json("Error en el servidor :", err);
		}
	});
};

//Editar
exports.edit = function (req, res, next) {
	var data_res;
	var id = req.params.id;
	CursoQuery.getIdCurso(id, function (err, doc) {
		//var id = id;
		var extension= null;
		var aux_extension= null;
		//Si existe archivo o no
		if (req.body.file === 'undefined') {
			extension = doc[0].extension;
			//console.log("No hay archivo y se remplazara por el viejo que es", extension);
		}else{
			extension = req.body.file.name.split(".").pop();
			//console.log("si Hay archivo y su extension es :", extension);
			aux_extension = "lleno";
		}

		var data = {
			nombre:req.body.nombre,
			descripcion: req.body.descripcion,
			extension:extension,
			fecha_inicio:req.body.fecha_inicio,
			precio:req.body.precio,
			pension:req.body.pension,
			meses:req.body.meses
		};
	
		CursoQuery.editCurso(id, data, function (err, docs) {
			if(!err){

				if (aux_extension !== null) {
					fs.remove("app/public/img/"+id+"."+ extension, function(err){
						if(!err){
							//console.log("Elimino imagen , Guardar nueva imagen");
							fs.copy(req.body.file.path, "app/public/img/"+id+"."+ extension);
							data_res={
								estado:0,
								mensaje: "Se modificó con exitó e imagen"
							}
							res.json(data_res);
						}	
					});
				}else{
					data_res={
						estado:0,
						mensaje: "Se modificó con exitó los datos"
						}
					res.json(data_res);
				}				
				
			}else{
				data_res={
					estado:1,
					mensaje: "Error"
				}
				res.json(data_res);
			}
		});
	});
};


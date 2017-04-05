var CuentaQuery 	= require("../models/qcuenta.js");

//añadir
exports.new = function (req, res ,next) {
	var data   = req.body;
	var id = req.body.id;
	var codigo = req.body.codigocuenta;
	var nombre = req.body.nombrecuenta;
	var data2   = {
		codigocuenta:codigo,
		nombrecuenta:nombre
	}
	var bandera= 0;
	var respuesta ={
		mensaje:"vacio",
		estado :"-1",
		doc:"0"
	}

	CuentaQuery.getcodigocuenta(codigo, function (err, doc1) {
		if (doc1 === null) { 
			CuentaQuery.getnombrecuenta(nombre, function (err, doc2) {
				if (doc2 === null) { 
					bandera=1;
					CuentaQuery.createCuenta(data2, function (err, doc) {
						if (doc !== null) {
							respuesta ={
								doc:doc,
								mensaje:"exito",
								estado:"0"
							}
						res.json(respuesta);
						}//<if>
				});
				}else{
					respuesta ={
						mensaje:"Ese nombre ya existe",
						estado :"1",
						doc:doc1
					}
					res.json(respuesta);
				}
			});
		}else{
			respuesta ={
				mensaje:"Ese codigo ya existe",
				estado :"1",
				doc:doc1
			}
		res.json(respuesta);
		}
	});
};
//listar todas las cuentas
exports.getall = function (req, res) {
	CuentaQuery.getallcuentas(function (err,doc) {
		if (!err) {
			res.json(doc);
		}else{
			res.json("error no se pudo listar");
			//res.json(estado:"2", mensaje:"error no se pudo listar");
		}
	});
};
//listar una cuenta
exports.getid = function (req, res) {
	var id = req.params.id;
	CuentaQuery.getidcuenta(id, function (err,doc) {
		if (!err) {
			res.json(doc);
		}else{
			res.json("error no se pudo listar");
			//res.json(estado:"2", mensaje:"error no se pudo listar");
		}
	});
};
//eliminar cuentas
exports.eliminar = function (req, res) {
	var id = req.params.id;
	console.log("mai",id);
	var respuesta={
		estado:"-1",
		mensaje:"0",
		doc:""
	}
	CuentaQuery.removecuenta(id, function (err, doc) {
		if (!err) {
			respuesta = {
				mensaje:"Se elimino con exito",
				estado:"1",
				doc:doc
			}
			res.json(respuesta);
		}
	});
};
//Editar un curso
exports.editar = function (req, res) {
	var id_params= req.params.id;
	var data   = req.body;
	var id = req.body.id;
	var codigo = req.body.codigocuenta;
	var nombre = req.body.nombrecuenta;
	var data2  = {
		codigocuenta:codigo,
		nombrecuenta:nombre
	}
	var bandera= 0;
	var mensaje="0";
	var respuesta ={
		mensaje:"vacio",
		estado :"-1",
		doc:"0"
	}
	
	CuentaQuery.getcodigocuenta(id_params, function (err, doc1) {
		if (doc1 === null) { 
			CuentaQuery.getnombrecuenta(nombre, function (err, doc2) {
				if (doc2 === null) { 
					bandera=1;
					CuentaQuery.editcuentaid(id, data2, function (err, doc) {
						if (doc !== null) {
							respuesta ={
								doc:doc,
								mensaje:"modificado con exitó",
								estado:"0"
							}
						res.json(respuesta);
						}//<if>
				});
				}else{
					respuesta ={
						mensaje:"Ese nombre ya existe",
						estado :"1",
						doc:doc1
					}
					res.json(respuesta);
				}
			});
		}else{
			respuesta ={
				mensaje:"Ese codigo ya existe",
				estado :"1",
				doc:doc1
			}
		res.json(respuesta);
		}
	});

};
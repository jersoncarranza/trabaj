var materialQuery 	= require("../models/qmaterial.js");
var libroDiario     = require("../models/qLibroDiario");
//insertar un material
exports.guardar = function (req, res ,next) {
	var data   = req.body;
	var respuesta;
	materialQuery.createMaterial(data, function (err, doc) {
		
		if (doc !== null) {
			respuesta ={
				doc:doc,
				mensaje:"exito",
				estado:"0"
			}
		}else{
			respuesta ={
				doc:doc,
				mensaje:"error",
				estado:"1"
			}
		}
		res.json(respuesta);
	});
};

//listar todos material
exports.listar = function (req, res ,next) {
	var respuesta;
	materialQuery.listMaterial(function (err, doc) {
		if (doc !== null) {
			respuesta = doc;
		}else{
			respuesta = "error";
		}
		res.json(respuesta);

	});
};
//listar todos material
exports.listarId = function (req, res ,next) {
	var id = req.params.id;
	var respuesta;
	materialQuery.listIdMaterial(id, function (err, doc) {
		if (doc !== null) {
			respuesta = doc;
		}else{
			respuesta = "error";
		}
		res.json(respuesta);

	});
};
//Editar//comprar
exports.editarId = function (req, res ,next) {
	var id   = req.params.id;
	var data = req.body;
	var cuenta = req.body.pago.id;
	//compras

	data.ncompras= data.ncompras + data.ncantidad;
	data.compras = data.compras+(data.ncantidad*data.costo);
	console.log(data);
	var asiento ={ //datos para el libro diario
		//fecha: data.fecha_matricula,
		descripcion:"adquisición de " +data.nombre,
		debe:{
			codigo_cuenta:"1.1.2.6",
			detalle:"mercadería",
			cantidad: data.ncantidad * data.costo
		},
		haber:[{
			codigo_cuenta:data.pago.id,
			detalle:      data.pago.name,
			cantidad:     data.ncantidad * data.costo
			}],
		sugerencia:"adquisición materiales",
	};
	
	libroDiario.createAsiento(asiento, function(err,docl){
		if (!err) {
			data_res ={	estado:"0" 	}
		}else{
			data_res ={	estado:"1" 	}
		}
	});
	
	materialQuery.editarMaterial(id, data, function (err, doc) {
		res.json(doc);
	});
	
	
};

//vender 
exports.venta = function (req, res ,next) {
	var id   = req.params.id;
	var data = req.body;
	var cuenta = "1.1.1.1";
	data.nventas= data.nventas+data.cantidadcomprar;
	data.ventas = data.ventas+ (data.cantidadcomprar*data.precio);
	data.cantidad= data.cantidad - data.cantidadcomprar;
	console.log(data);
	
	var asiento ={ //datos para el libro diario
		//fecha: data.fecha_matricula,
		descripcion:"venta de " +data.nombre,
		debe:{
			codigo_cuenta:"1.1.1.1",
			detalle:"caja",
			cantidad: data.cantidadcomprar * data.precio
		},
		haber:[{
			codigo_cuenta:"1.1.2.6",
			detalle:      "mercadería",
			cantidad:     data.cantidadcomprar * data.precio
			}],
		sugerencia:"venta materiales",
	};
	
	libroDiario.createAsiento(asiento, function(err,docl){
		if (!err) {
			data_res ={	estado:"0" 	}
		}else{
			data_res ={	estado:"1" 	}
		}
	});
	

	materialQuery.ventaMaterial(id,data,function(err,doc){
		res.json(doc);
	});
	
	
	
};

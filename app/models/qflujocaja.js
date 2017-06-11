var modelsLibroDiario = require('./schema/LibroDiario');

exports.buscarCuenta = function (callback) {
	
	var query = {
		$or:[
			{"debe.detalle":"caja"},
			{"debe.codigo_cuenta":"1.1.1.1"},
			{"haber.detalle":"caja"},
			{"haber.codigo_cuenta":"1.1.1.1"},
			]
		}
	var campos = {
		fecha:1,
		descripcion:1,
		sugerencia:1,
		"debe.detalle":1,
		"debe.cantidad":1,
		"debe.codigo_cuenta":1,
		"haber.detalle":1,
		"haber.cantidad":1,
		"haber.codigo_cuenta":1,
	}
	modelsLibroDiario.LibroDiario.find(query, campos, callback).sort({fecha:1});
};
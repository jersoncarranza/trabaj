var mongoose = require('mongoose');


var rolPagosSchema = mongoose.Schema({
	date: {type: Date, default: Date.now },
	cargo:{type: String },
	cedula:{type: String },
	comision:{type:Number},
	iesspatrono:{type:Number},
	iesstrabajador:{type:Number},
	mes:{type:Number},
	nombre:{type: String },
	prestamo:{type:Number},
	sueldo:{type:Number}

});

//var User = module.exports = mongoose.model('User', rolPagosSchema);
var rolPagos = mongoose.model('rolPagos', rolPagosSchema);
exports.rolPagos = rolPagos;
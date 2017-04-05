var mongoose = require('mongoose');
//link
// http://enrique-asuntoscontables.blogspot.com/2011/09/clasificacion-general-de-las-cuentas.html
var LibroDiarioSchema = mongoose.Schema({
	fecha:{type: Date, default: Date.now },
	descripcion:{type: String},
	debe:[{
		codigo_cuenta:{type: String },//Estandar 
		detalle:{type: String},
		cantidad:{type:Number}
	}],
	haber:[{
		codigo_cuenta:{type: String },//Estandar 
		detalle:{type: String},
		cantidad:{type: Number}
	}],
	sugerencia:{type: String}


});

LibroDiarioSchema.set('toJSON',{
	transform: function (doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var LibroDiario = mongoose.model('LibroDiario', LibroDiarioSchema);
exports.LibroDiario = LibroDiario;


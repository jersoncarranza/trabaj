var mongoose = require('mongoose');
//link
// http://enrique-asuntoscontables.blogspot.com/2011/09/clasificacion-general-de-las-cuentas.html
var situacionInicialSchema = mongoose.Schema({
	fecha:{type: Date, default: Date.now },
	activo:[{
		codigoCuenta:{type: String },//Estandar 
		cuenta:{type: String},
		cantidad:{type:Number}
	}],
	pasivo:[{
		codigoCuenta:{type: String },//Estandar 
		cuenta:{type: String},
		cantidad:{type: Number}
	}],
	patrimonio:[{
		codigoCuenta:{type: String },//Estandar 
		cuenta:{type: String},
		cantidad:{type: Number}
	}]



});

situacionInicialSchema.set('toJSON',{
	transform: function (doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var situacionInicial = mongoose.model('situacionInicial', situacionInicialSchema);
exports.situacionInicial = situacionInicial;


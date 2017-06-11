var mongoose = require('mongoose');

var CursoMaterial = mongoose.Schema({
	cantidad:{type:Number, default:0},
	nombre:{type: String},
	costo:{type: Number, default:0 },
	precio:{type: Number, default:0 },
	date: {type: Date, default: Date.now },
	nventas:{type: Number, default:0 },//numero
	ventas:{type: Number, default:0 },
	ncompras:{type: Number, default:0 },//numero
	compras:{type: Number, default:0 }
});

var Material     = mongoose.model('Material', CursoMaterial);
exports.Material = Material;
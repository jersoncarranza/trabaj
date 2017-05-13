var mongoose = require('mongoose');

var CursoMaterial = mongoose.Schema({
	cantidad:{type:Number, default:0},
	nombre:{type: String},
	costo:{type: Number, default:0 },
	precio:{type: Number, default:0 },
	date: {type: Date, default: Date.now }

});

var Material     = mongoose.model('Material', CursoMaterial);
exports.Material = Material;
var mongoose = require('mongoose');
var bcrypt	 = require('bcryptjs');
//mongoose.connect('mongodb://localhost/eis');
//var db = mongoose.connection;
var CursoSchema = mongoose.Schema({
	nombre:{type: String },
	date: {type: Date, default: Date.now },
	descripcion:{type: String },
	extension:{type: String },
	fecha_inicio:{type:Date},
	precio:{type:Number},
	pension:{type:Number},
	meses:{type:Number}

});

//var User = module.exports = mongoose.model('User', CursoSchema);
var Curso = mongoose.model('Curso', CursoSchema);
exports.Curso = Curso;
var mongoose = require('mongoose');

var EstudianteSchema = mongoose.Schema({
	cedula:{type: String },
	nombres:{type: String },
	apellido1:{type: String },//Apellido Paterno
	apellido2:{type: String },//Apellido Materno
	sexo:{type: String},
	auxiliar:{type:String},
	estado:{type:String, default: "0"},
	cursos:[{
		id_curso:{type: String ,default: "0"}, 
		nombre_curso:{type: String ,default: "none" },
		precio_curso:{type: String ,default: "0" },
		estado:{type: String, default: "0"}
	}],
	imagen:{type:String, default:"./img/user.png"}

});

EstudianteSchema.set('toJSON',{
	transform: function (doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var Estudiante = mongoose.model('Estudiante', EstudianteSchema);
exports.Estudiante = Estudiante;


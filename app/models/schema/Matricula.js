var mongoose = require('mongoose');

var MatriculaSchema = mongoose.Schema({
	fecha_matricula:{type: String },//fecha de matricula del estudiante
	/*estudiante:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'estudiantes'
	},
	curso:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'cursos'
	},*/
	cursos:{
		nombre:{type: String },
		precio:{type: String },
		id:{type: String },

	},
	estudiantes:{
		id:{type: String },
		nombres:{type: String },
		apellido1:{type: String },
		apellido2:{type: String },
		cedula:{type: String },
		sexo:{type: String },
	}

});

MatriculaSchema.set('toJSON',{
	transform: function (doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var Matricula = mongoose.model('Matricula', MatriculaSchema);
exports.Matricula = Matricula;


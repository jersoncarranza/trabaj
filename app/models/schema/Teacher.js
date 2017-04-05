var mongoose = require('mongoose');
var bcrypt	 = require('bcryptjs');


var TeacherSchema = mongoose.Schema({
	cedula:{type: String },
	cargo:{type: String },
	nombre:{type: String },
	apellido:{type: String },
	comentarios:{type:String},
	estado:{type:Number},
	//prevotos:{type:Number, default: 0},
	//imagen:{type:String, default:"./img/user.png"},
	/*calificacion:[{
		user:{type:String},
		voto:{type:Number}
	}]
*/
	/*calificacion:{
		"$ref":"UserSchema",
		"$db":"loginapp",
		"$id": String
	}*/
});

TeacherSchema.set('toJSON',{
	transform: function (doc, ret, options) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

var Teacher = mongoose.model('Teacher', TeacherSchema);
exports.Teacher = Teacher;


module.exports.prevotos  = function (user, callback) {
	var id = user._id;
	console.log("user", id);
	var query = {
		$inc:{prevotos: + 1}
	};
	Teacher.update({"_id":id}, query, callback);
}
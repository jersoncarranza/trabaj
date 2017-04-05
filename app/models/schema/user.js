var mongoose = require('mongoose');
var bcrypt	 = require('bcryptjs');

//mongoose.connect('mongodb://localhost/practicas');
mongoose.connect('mongodb://jaspe:jaspe@ds038379.mlab.com:38379/mlab');
var db = mongoose.connection;
 	
//mongoose.connect('mongodb://localhost/eis');
//var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	username:{type: String },
	password:{type: String},
	email:{type:String},
	name:{type:String},
	//skin:{type:String, default:"./img/char.png"},

});

//var User = module.exports = mongoose.model('User', UserSchema);
var User = mongoose.model('User', UserSchema);
exports.User = User;

var models = require('./schema/user.js'); 	
var bcrypt	 = require('bcryptjs');

//***********************Todo esto para el login y Registrarse
// Crear usuario
exports.createUser = function (newUser, callback) {
	FindEmail(newUser, function (err, user) {//comprobar si ya existe este mail
		//console.log("cantidad",user);
		if(user === 0 ){
			console.log("Va ha guardar");
			bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(newUser.password, salt, function (err, hash) {
					newUser.password = hash;
					var User = new models.User(newUser);
					User.save(callback);
				});
			});
		}else{
			console.log("No guardo");
			var email = newUser.email;
			var query = {email:email};
			models.User.count(query, callback);
		} 
	});

};


exports.getUserByUsername  = function (username, callback) {
	var query = {username:username};
	//console.log("user", username);
	models.User.findOne(query, callback);
}

exports.getUserById  = function (id, callback) {
	//var query = {id:id};
	models.User.findById(id, callback);	
}

exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash , function (err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
}

exports.countByUsername  = function (username, callback) {
	var query = {username:username};
	models.User.count(query, callback);
}

exports.getUserByEmail  = function (email, callback) {
	var query = {email:email};
	console.log("email", email);
	models.User.findOne(query, callback);
}

//encontrar usuario por username
function FindUsername(newUser, callback) {
	var username = newUser.username;
	var query = {username:username};
	models.User.count(query, callback);

}

//encontrar email
function FindEmail(newUser, callback) {
	var email = newUser.email;
	var query = {email:email};
	models.User.count(query, callback);

}
///***********************Generacion de API
//encontrar todos los usuarios
exports.FindAllUsers = function (callback) {
	models.User.find(callback);
}
///encontrar usuario
exports.FindOneUser = function (id, callback) {
	var query = {_id:id};
	models.User.findOne(query, callback);
}

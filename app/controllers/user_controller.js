var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserQuery 	= require("../models/quser.js");

//Listar a todos los usuarios
exports.list = function(req, res) {
		UserQuery.FindAllUsers( function (err, docs) {
			res.json(docs);
		});
	};
//Listar un usuario
exports.listId = function(req, res) {
		var id = req.params.id;
		UserQuery.FindOneUser( id , function (err, docs) {
			res.json(docs);
		});
	};
//cerrar sesion
exports.logout = function (req, res) {
		req.logout();
		req.flash('success_msg','Vuelve Pronto');
		res.redirect('/');
	};


////
///************passport
	passport.use(new LocalStrategy(
		function (username, password , done) {
			UserQuery.getUserByEmail(username, function (err, user , res) {
				if(err) throw err;
				if(!user){return done(null, false, {message:'Usuario Desconocido'});}
				UserQuery.comparePassword(password, user.password, function (err, isMatch) {
					if(err) throw err;
					if(isMatch){
						console.log("usuario", user);
						//res.json(user);
						//res.render("index");
						return done(null, user);
					}else{
						return done(null, false, {message: 'Contraseña invalida'})
					}
				});
			});
	}));

	passport.serializeUser(function (user,done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		UserQuery.getUserById(id,function (err, user) {
			done(err, user);
		});
	});
	//crear un nuevo usuario
	exports.register = function (req, res, next) {
		var name = req.body.name;
		var email = req.body.email;
		var password = req.body.password;
		var password2 = req.body.password2;

		req.checkBody('name', 'Ponga un nombre').notEmpty();
		req.checkBody('email', 'Escriba un correo').notEmpty();
		req.checkBody('email', 'Escriba un correo valido').isEmail();
		req.checkBody('password', 'Escriba una contraseña').notEmpty();
		req.checkBody('password2', 'Escriba la misma contraseña').equals(req.body.password);
		var errors = req.validationErrors();

		if(errors){
			res.render('register',{
				errors:errors
			});
		}else{
			var newUser ={
				name: name,
				email:email,
				password:password
			};
			
			console.log("antes", newUser );
			UserQuery.createUser(newUser, function (err, userdata) {
				//console.log("Create userdata", userdata);
				if (userdata === 1) {
					//console.log("REgistrate");
					req.flash('success_msg','Este correo ya está registrado, Inicia sesión');
					res.render('register');
				}else{
					//req.flash('success_msg','Gracias por regístrate ');
					console.log("Gracias", userdata );
            		res.render('index',{user:userdata});
				}

			});
			 
		} 
	};

	exports.login = passport.authenticate('local', {successRedirect:'/register', failureRedirect:'/register',failureFlash: true}),
  		function(req, res) {
  			console.log("heyydddddd", username);
 	};
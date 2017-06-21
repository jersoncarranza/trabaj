var express = require('express');
var router = express.Router();
//var passport= require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var UserQuery 	= require("../models/quser.js");
//var User 	= require("../models/schema/user.js");

var userController = require('../controllers/user_controller.js');

	
	router.get('/register',ensureAuthenticated, function (req, res) {
		res.render('index');
	});

	//Verificar si esta autenticado
	function ensureAuthenticated(req, res , next) {
		if(req.isAuthenticated()){
			return next();
		}else{
			res.render('register');
			req.flash('error_:msg','No te has logueado');
		}
	}

	//crear un nuevo usuario
	router.post('/', userController.register);
	router.post('/login', userController.login);
	router.get('/logout', userController.logout);
	//****************API JSON
	//Listar todos los usuarios
	router.get('/list/user', userController.list);
	//Listar un usuario
	router.get('/list/user/:id', userController.listId);

module.exports = router;
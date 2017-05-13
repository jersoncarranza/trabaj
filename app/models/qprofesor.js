var models = require('./schema/Teacher.js'); 	
var bcrypt	 = require('bcryptjs');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectID;

// Crear usuario
exports.createUser = function (newUser, callback) {
	var Teacher = new models.Teacher(newUser);
	Teacher.save(callback);
};

exports.FindAllTeacher = function (callback) {
	var query = {
		prevotos:{$gt:15}
	};
	//que campos van a salir
	var campos = {
		apellido:1,
		nombre:1
		//imagen:1
	}
	models.Teacher.find(query, campos, callback);
};

//modificar profesor
exports.actualizarTeacher = function (id , data, callback) {

	var query = {_id:id};
	
	var campos = {
		cedula : data.cedula,
		apellido:data.apellido,
		nombre : data.nombre,
		cargo  : data.cargo,
		sueldo : data.sueldo
	};

	models.Teacher.update(query, {$set:campos}, callback);
	//models.Teacher.update(query, {$addToSet:campos} , callback);
	
};

//profesores en la lista de candidatos

exports.FindTeacherList = function (callback) {
	var query = {
		prevotos:{$lt:16}
	};
	models.Teacher.find(callback);
};

//eliminar un profesor

exports.removeTeacher = function(id, callback){
	var query = {_id:id};
	models.Teacher.findOneAndRemove(query, callback);
};

//actualizar un profesor


exports.updateTeacher = function (id, data, callback) {
	var query = {_id: id};
	var campos = data;
	models.Curso.update(query, {$set:campos}, callback);
};

///encontrar usuario
exports.FindOneUser = function (id, callback) {
	var query = {_id:id};

	var campos = {
		apellido:1,
		nombre:1,
		cedula:1,
		cargo:1,
		sueldo:1	
	};
	models.Teacher.findOne(query, campos , callback);
};

//encontrar un usuaro por su cedula
exports.FindOneUserCedula= function (cedula, callback) {
	var query = {cedula: cedula};
		var campos = {
		apellido:1,
		nombre:1,
		cedula:1,
		cargo:1,
		sueldo:1
	};
	models.Teacher.findOne(query, campos , callback);
};

//cuando el estudiante es nuevo pra votar
exports.votonew = function (data, callback) {

	//console.log("datamodel", data);
	var query = {_id:data.id};

	var campos = {
		calificacion:{
			user:data.user,
			voto:data.rate
		}
	};
	models.Teacher.update(query, {$addToSet:campos} , callback);
	//models.Teacher.update(query, {$set:campos} , callback);
	//models.Teacher.update(query, {$push:campos} , callback);
	//models.Teacher.update(query, {$pop:campos} , callback);
};


//
//cuando el estudiante es nuevo pra votar
exports.votoremove = function (data, callback) {

	//console.log("datamodel", data.user);
	var query = {_id:data.id};

	var campos = {
		calificacion:{
			user:data.user
		}
	};
	models.Teacher.update(query, {$pull:campos},callback );
	//models.Teacher.update(query, {$set:campos} , callback);
	//models.Teacher.update(query, {$push:campos} , callback);
	//models.Teacher.update(query, {$pop:campos} , callback);
};
//
exports.validacionvoto = function (data, callback) {
	var flag = data.id;
	//console.log("user",data.user);
	var query = {
		_id:data.id
	
	};
	var campos = {
		nombre:1,
		apellido:1,
		calificacion:1

	};
	models.Teacher.find(query, campos, callback);

};

//resultados de un profesor por su id
exports.resultados = function (data, callback) {
	var query = {
		_id:data
	};
	var campos = {
		calificacion:1
		//calificacion: { $push: "$prevotos" }
	};
	models.Teacher.find(query, campos, callback);
	/*
	models.Teacher.aggregate(
	   [
	     { $group : { _id : "$calificacion:voto", Teacher: { $push: "$calificacion" } } }
	   ],callback
	)
	*/
};

//resultados de todos los profesores
exports.resultadosall = function (callback) {
	
	var query = {
		prevotos:{$gt:15}
	};
	var campos = {
		nombre:1,
		apellido:1,
		calificacion:1
		};
	models.Teacher.find(query, campos, callback);
	
};


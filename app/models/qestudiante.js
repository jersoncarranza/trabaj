 models = require('./schema/Estudiante.js'); 

//Añadir un usuario
exports.createEstudiante =  function (data, callback){
		var Estudiante = new models.Estudiante(data);
		Estudiante.save(callback);
};

//Listar Estudiante
exports.listEstudiante =  function (callback) {
	var query = {
		estado: 0
	}

	var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1
	}
	models.Estudiante.find(query, campos, callback);
};

///encontrar un estudiante
exports.FindOneEstudiante = function (id, callback) {
	var query = {_id:id};

	var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1,
		cursos:1
	};
	models.Estudiante.findOne(query, campos , callback);
};

//encontrar un estudiante por su cedula
exports.FindOneEstudianteCedula= function (cedula, callback) {
	var query = {
			cedula: cedula
			
		};
		var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1,
		cursos:1	
	};
	models.Estudiante.findOne(query, campos , callback);
};

//eliminar un estudiante`por su id
exports.removeEstudiante = function (id, callback) {
	var query = {_id:id}	
	models.Estudiante.findOneAndRemove(query, callback);
};

//actualizar un estudiante
exports.updateEstudiante = function (id, data, callback) {
	var query = {_id:id};
	var campos = {
		nombres:data.nombres,
		apellido1:data.apellido1,//Apellido Paterno
		apellido2:data.apellido2,//Apellido Materno
		sexo:data.sexo,
	}
	models.Estudiante.update(query, {$set:campos}, callback);
};

//Eliminar todos los cursos de un estudiante por id
exports.removeAllCursoEstudiante = function (id, callback) {
	var query = {_id:id};
	var campos = {
		cursos:[]
	}
	models.Estudiante.update(query, {$set:campos}, callback);
};

//Eliminar todos los cursos de un estudiante por cedula
exports.removeAllCursoEstudianteCedula = function (cedula, callback) {
	var query = {cedula:cedula};
	var campos = {
		cursos:[]
	}
	models.Estudiante.update(query, {$set:campos}, callback);
};

//login estudiante
exports.login = function (cedula, contrasena, callback) {
	var query = {
		cedula:cedula,
		auxiliar:contrasena
	};
	var campos = {
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1,
		cursos:1,
	};
	models.Estudiante.findOne(query, campos , callback);
};

//Modificar: Añadir un curso 
exports.addcursoEstudiante = function (cedula, data, callback) {
	var query = {cedula:cedula};
	
	var campos={
		cursos:{
			id_curso: data.id_curso, 
			nombre_curso:data.nombre_curso,
			precio_curso:data.precio_curso,
			estado: data.estado
		}
	}
	models.Estudiante.update(query, {$addToSet:campos}, callback);
};

//Cambiar de estado 
exports.cambiarEstadoCurso = function (cedula , curso, callback) {
	var query = {cedula:cedula};
	var campos = {
		cursos:[{
			nombre_curso: curso.nombre_curso,
			precio_curso: curso.precio_curso,
			estado: "1",
			id_curso:curso.id_curso
		}]
	}
	models.Estudiante.update(query, {$set:campos}, callback);
};

//cambiar para de estado
exports.addcursoEstudiante2 = function (cedula, curso, callback) {
	var query = {cedula:cedula};
	console.log("data22", curso);
	var campos={
		cursos:{
			estado :"1",
			nombre_curso: curso.nombre_curso,
			precio_curso: curso.precio_curso,
			id_curso:curso.id_curso
		}
	}
	models.Estudiante.update(query, {$addToSet:campos}, callback);
};

//estudiantes matriculado
exports.listcursosestudiantes = function (curso, callback) {
	console.log(curso);
	var query = {
		 
		 	"cursos":{$elemMatch: {estado: "1", id_curso:curso}}
		 
	};
	var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1
	};
	models.Estudiante.find(query, campos, callback);
};
//===================contar estudiante============000

exports.contarEstudiantes = function (callback) {
	var query = {"cursos.estado":"1"};
	var campos = {
		cursos:1
	};
	//var query = {		 	"cursos":{estado: "1", id_curso:curso}};

	models.Estudiante.find(query,campos ,callback);
};
//=================================================
//estudiantes matriculado
exports.estudiateprematricula = function (callback) {
	var query = {
		"cursos":{$elemMatch: {estado: "0"}}
	};
	var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1
	};
	models.Estudiante.find(query, campos, callback);
};

//======================Materia===============
exports.materia = function (callback){
	var query = {
		"cursos":{
			//$elemMatch: {id_curso: id},
			$elemMatch: {estado: "1"}
		}
	};
	var campos = {
		cedula:1,
		nombres:1,
		apellido1:1,
		apellido2:1,
		telefono:1,
		email:1,
		sexo:1,
		cursos:1
	};
	models.Estudiante.find(query, campos, callback);
};
//==============lista de pagos de un cliente=====
exports.materiapagos = function (id,callback) {
	var query = {
		cedula:id,
		"cursos":{$elemMatch: {estado: "1"}}
		//"cursos.estado":"1"
		//"cursos.id_curso":idcurso,
		//"cursos":{id_curso: idcurso}

		//"cursos":{$elemMatch: {estado: "1", id_curso:idcurso}}
	};
	var campos = {
		cedula:1,
		cursos:1
		/*
		"cursos.nombre_curso":1,
		"cursos.pagos":1,
		*/
	};
	models.Estudiante.findOne(query, campos, callback);
};

//==================Actualizar pensiones
exports.actualizarPagosPensiones = function (cedula, documento,callback) {
	var query = {
		cedula:cedula
	};
	
	models.Estudiante.update(query,documento,callback);
	//  {$set:campos}
};
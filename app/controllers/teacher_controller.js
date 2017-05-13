var TeacherQuery 	= require("../models/qprofesor.js");

//crear nuevo profesor
exports.new = function (req, res, next) {
	var data = req.body;
	var data_res;
	var cedula = req.body.cedula;

	TeacherQuery.FindOneUserCedula(cedula, function (err, doc) {
		if(!err){
			if (doc === null) {//si el profesor no existe lo guardamos
				TeacherQuery.createUser(data, function (err, docs) {
					if (!err) {
						data_res={
							estado:0,
							listId: "correctamente ingresado"
						}
						res.json(data_res);
					}else{
						data_res={
							estado:1,
							mensaje: "Error"
						}
						res.json(data_res);
					}
				});
		}else{
				data_res={
					estado:2,
					mensaje: "Ya esta ingresado"
				}
				res.json(data_res);
			}
		}//no tiene else el if (doc === null)
	});
};

//===========Cédula profesores
exports.FindOneUserCedula = function (req, res, next) {
	var cedula = req.params.cedula;
	var data_res;
	TeacherQuery.FindOneUserCedula(cedula, function (err, doc) {
		if (!err) {
			res.json(doc);
		}else{
			data_res={
				estado:2,
				mensaje: "Error"
			}
			res.json(data_res);
		}
	});
};
//listar todos profesores
exports.list = function (req, res, next) {
		var data;
		TeacherQuery.FindAllTeacher(function (err, docs) {
			if (!err) {
				res.json(docs);
			} else{
				data = {
					mensaje:"No se pudo listar",
					estado :"1"
				}
			res.json(data);
			}
		})
	};
//Listar un usuario
exports.listId = function(req, res) {
		var data;
		var id = req.params.id;

		TeacherQuery.FindOneUser( id , function (err, docs) {
			if (!err) {
				res.json(docs);
			}else{
			data = {
					mensaje:"Error en el servidor",
					estado :"2"
				}
			res.json(data);
			}
		});
	};

//listar profesores 
exports.listTeacher = function (req, res, next) {
		var data;
		TeacherQuery.FindTeacherList(function (err, docs) {
			if (!err) {
				res.json(docs);
			}else{
				data = {
					mensaje:"Error en el servidor",
					estado :"2"
				}
			res.json(data);
			}
		})
	};

//eliminar un profesor

exports.removeTeacher = function (req, res, next) {
	var id = req.params.id;
	var data;
	TeacherQuery.removeTeacher(id, function (err, docs) {
		if(!err){
			data = {
					mensaje:"Se eliminó correctamente",
					estado :"0"
				}
				res.json(data);
		}else{
			data = {
					mensaje:"No se eliminó intentelo mas tarde",
					estado :"1"
				}
				res.json(data);
		}
	});
};


//actualizar un profesor
exports.updateTeacher = function (req, res, next) {
	var data	 = req.body ;
	var id = req.params.id;
	var data_res;
	TeacherQuery.actualizarTeacher(id, data, function (err, docs) {
		if(!err){
				data_res = {
					mensaje:"Se actualizó correctamente",
					estado :"0"
				}
				res.json(data_res);
		}else{
			data_res = {
					mensaje:"No se actualizó",
					estado :"1"
				}
			res.json(data_res);
		}
	});
	
};

//votos a los profesores lista principal
exports.updatevotos = function (req, res, next) {
	var data = req.body;	
	TeacherQuery.validacionvoto(data, function (err, docs) {

		//si es "false" no existe ,si es "true " existe
		var flag=false;
		for (var i = 0; i < docs[0].calificacion.length; i++) {
			if (data.user===docs[0].calificacion[i].user) {
				//console.log("true");
				flag =true;
			}else{
				//console.log("false");
			}
		}

		if (flag !== true) {
			//insertar
			TeacherQuery.votonew(data, function (err, docs) {
				res.json(docs);
			});
		}else{
			//eliminar
			TeacherQuery.votoremove(data, function (doc) {
				console.log(doc);
			});	
			//insertar
			TeacherQuery.votonew(data, function (err, docs) {
				res.json(docs);
			});
		}
	});
};
//calificacion de un profesor por id
exports.calificacion=function (req, res, next) {

		//var data = "57a1317a43790c8822a6ce77";
		var data = req.params.id;
		//console.log("data",data);
		var sum = new Object();
		sum.ten=0;
		sum.nine=0;
		sum.eight=0;
		sum.seven=0;
		sum.six=0;
		sum.five=0;
		sum.fourth=0;
		sum.three=0;
		sum.two=0;
		sum.one=0;

		var sumatoriatotalvotos = 0;
		var cantidadusuarios = 0;
       	
       	TeacherQuery.resultados(data, function (err, docs) {
				for (var i = 0; i < docs[0].calificacion.length; i++) {
					
					sumatoriatotalvotos = sumatoriatotalvotos + docs[0].calificacion[i].voto;
					cantidadusuarios    = cantidadusuarios + 1 ;
					if (10===docs[0].calificacion[i].voto) {
						sum.ten = sum.ten + 1;
					}
					if (9===docs[0].calificacion[i].voto) {
						sum.nine = sum.nine + 1;
					}
					if (8===docs[0].calificacion[i].voto) {
						sum.eight = sum.eight + 1;
					}
					if (7===docs[0].calificacion[i].voto) {
						sum.seven = sum.seven + 1;
					}
					if (6===docs[0].calificacion[i].voto) {
						sum.six = sum.six + 1;
					}
					if (5===docs[0].calificacion[i].voto) {
						sum.five = sum.five + 1;
					}
					if (4===docs[0].calificacion[i].voto) {
						sum.fourth = sum.fourth + 1;
					}
					if (3===docs[0].calificacion[i].voto) {
						sum.three = sum.three + 1;
					}
					if (2===docs[0].calificacion[i].voto) {
						sum.two = sum.two + 1;
					}
					if (1===docs[0].calificacion[i].voto) {
						sum.one = sum.one + 1;
					}
				}
			sum.promedio = sumatoriatotalvotos / cantidadusuarios;
			//console.log("hey promedio", sum.promedio);
			res.json(sum);
		});
};
//calificacion de de todos los profesores
exports.calificacionall = function (req, res, next) {

	var datos           = new Object();
	datos.resultados    = new Array();
	//datos.resultados[0] = new Object();


	TeacherQuery.resultadosall(function (err, docs) {
		for (var i = 0; i < docs.length; i++) {

			datos.resultados[i] = new Object();
			datos.resultados[i].nombre   = docs[i].nombre;
			datos.resultados[i].apellido = docs[i].apellido;
			//los votos para el promedio
			var suma = 0;
			for (var j = 0; j < docs[i].calificacion.length; j++) {
				suma = suma + docs[i].calificacion[j].voto;
				console.log("suma", suma);
				datos.resultados[i].count =  docs[i].calificacion.length;
				
				var numero = suma / docs[i].calificacion.length ;
				datos.resultados[i].promedio= numero.toFixed(1);
				//datos[j].voto = docs[i].calificacion[i].voto;

			}
			

		}
		res.json(datos);
	});
};
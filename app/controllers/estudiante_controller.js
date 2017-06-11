var EstudianteQuery 	= require("../models/qestudiante.js");
var request				= require('request');
var libroDiario     = require("../models/qLibroDiario");
var curso     = require("../models/qcurso");
//crear un nuevo estudiante
exports.new = function (req, res, next){
	var data_aux = req.body;
	var cedula = req.body.cedula;
	var data_res; //respuesta
	var data = {
		cedula: req.body.cedula,
		nombres: req.body.nombres,
		apellido1: req.body.apellido1,//Apellido Paterno
		apellido2: req.body.apellido2,//Apellido Materno
		sexo: req.body.sexo,
		auxiliar:req.body.auxiliar,
		cursos:[{
			id_curso:     req.body.cursos.id_curso, 
			nombre_curso: req.body.cursos.nombre_curso,
			precio_curso: req.body.cursos.precio_curso,

		}]
	}

	EstudianteQuery.FindOneEstudianteCedula(cedula, function (err, doc) {
		if(!err){//primer if
			if (doc === null) {//si el estudiante no existe ===> Lo guardamos
				EstudianteQuery.createEstudiante(data, function (err, docs) {
					if (!err) {
						data_res={
							estado:0,
							mensaje: "correctamente ingresado"
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
		}//primer if
	});
};

//crear un nuevo estudiante
exports.newadmin = function (req, res, next){
	var data_aux = req.body;
	var cedula = req.body.cedula;
	var data_res; //respuesta
	var data = {
		cedula: req.body.cedula,
		nombres: req.body.nombres,
		apellido1: req.body.apellido1,//Apellido Paterno
		apellido2: req.body.apellido2,//Apellido Materno
		sexo: req.body.sexo,
		auxiliar:req.body.auxiliar
	}

	EstudianteQuery.FindOneEstudianteCedula(cedula, function (err, doc) {
		if(!err){//primer if
			if (doc === null) {//si el estudiante no existe ===> Lo guardamos
				EstudianteQuery.createEstudiante(data, function (err, docs) {
					if (!err) {
						data_res={
							estado:0,
							mensaje: "correctamente ingresado"
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
		}//primer if
	});
};


// listar todos los estudiante
exports.list = function(req, res, next){
	EstudianteQuery.listEstudiante(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

//listar un estudiante por su id
exports.listId = function(req, res) {
		var id = req.params.id;
		EstudianteQuery.FindOneEstudiante( id , function (err, docs) {
			if(!err){
				res.json(docs);
			}else{
				res.json("Error en el servidor.. no se pudo listar", err);
			}
		});
	};

//Listar un estudiante por su cedula
exports.listCedula = function(req, res) {
		var id = req.params.id;
		EstudianteQuery.FindOneEstudianteCedula( id , function (err, docs) {
			if(!err){
				res.json(docs);
			}else{
				res.json("Error en el servidor.. no se pudo listar", err);
			}
		});
	};

//eliminar un estudiante
exports.removeEstudiante = function (req, res) {
	var id = req.params.id;
	var data_res; //respuesta
	EstudianteQuery.removeEstudiante(id, function (err, docs) {
		if (!err) {
			data_res={
				estado:0,
				mensaje: "correctamente eliminado"
			}
			res.json(data_res);
		}else{
			data_res={
				estado:1,
				mensaje: "No se pudo eliminar"
			}
			res.json(data_res);
		}
	});
};

//actualizar  un estudiante
exports.updateEstudiante = function (req, res, next) {
	var data = req.body;
	var id   = req.params.id;
	var data_res;
	EstudianteQuery.updateEstudiante(id, data, function (err, docs) {
		if (!err) {
			data_res={
				mensaje:"Se actualizó correctamente",
				estado:"0"
			}
			res.json(data_res);
		}else{
			data_res={
				mensaje:"No se actualizó",
				estado:"1"
			}
			res.json(data_res);
		}
	});
};

//login estudiante
exports.login = function (req, res) {
	var cedula 		= req.body.cedula2;
	var contrasena  = req.body.contrasena2;
	var cursos      = req.body.cursos;

	var ban=0;//por defecto: ese estudiante no eligio el curso

	var data_res;
	EstudianteQuery.login(cedula, contrasena, function (err, doc) {
		if (!err) {
			if (doc !== null) {
				//verifcar que no tome el curso dos veces
				for (var i = 0; i < doc.cursos.length; i++) {
					if (doc.cursos[i].id_curso === cursos.id_curso) {
						ban=1;//si son iguales, ese curso ya eligio el estudiante
					}
				}

				if (ban === 0) {
				//console.log(doc.cursos[2].'0'.id_curso);
					EstudianteQuery.addcursoEstudiante(cedula, cursos, function (err, doc2) {
						data_res={
							doc:doc,
							mensaje:"Autenticado correctamente, Curso Agregado correctamente",
							estado:0,
							curso:0
						}
						res.json(data_res);
					});
				}else{
					data_res={
						doc:doc,
						mensaje:"Autenticado correctamente , Ese curso ya lo eligio",
						estado:0,
						curso:1
					}
					res.json(data_res);
				}


			}else{
				data_res={
					mensaje:"Usuario o clave incorrecta",
					estado:1
				}
				res.json(data_res);
			}
		}else{
			data_res={
				mensaje:"Error en el servidor",
				estado:2
			}
			res.json(data_res);
		}
	});
};

//remove curso
exports.removecurso = function (req, res) {
	var id 		= req.params.id;
	var datos 	= req.body
	var cedula  = datos.cedula;
	var data_res;
	var contNewArray=0;//contador para el nuevo array que alamacenera los cursos
	var bandera = 0; // Si la bandera cambia a 1 , se procede a ejecutar la funcion removecurso , mas por medida de seguridad
	console.log("id", id);
	EstudianteQuery.FindOneEstudianteCedula(cedula , function (err, doc) {
		if(!err){
			var res_doc = doc;
			if (doc !== null) {
				
				for (var i = 0; i < doc.cursos.length; i++) {
					if (doc.cursos[i].id_curso !== id) {
						//console.log(doc.cursos[i]);
						bandera = 1;
						contNewArray = contNewArray +1;
					} 
				}
				//<FOR> Lave de la bandera


				if (bandera === 1) { 
					var idestudiante   =  doc._id;
					var data = {
						nombres   : doc.nombres,
					    apellido1 : doc.apellido1,
					    apellido2 : doc.apellido2,
					    sexo      : doc.sexo,
						cursos 	  : []
					}
					console.log(idestudiante, data);

					EstudianteQuery.removeAllCursoEstudiante(idestudiante, function (err, doc2) {

						for (var i = 0; i < res_doc.cursos.length; i++) {
							if (res_doc.cursos[i].id_curso !== id) {
								EstudianteQuery.addcursoEstudiante(cedula, res_doc.cursos[i] , function (err, doc3) {

									
								}); //<{> addcursoEstudiante

							} // <IF> 

						} // <For> { llave del for 

						data_res={
							estado:0,//con exito
							curso:0
						}
						res.json(data_res);

					}); //<{> updateEstudiante

				} // <IF> If de la bandera			
			}
			else{
				data_res={
					estado:1,
					mensaje: "si existe"
				}
				res.json(data_res);
			}
		}else{//primer if
			data_res={
				estado:2,
				mensaje: "Error del sistema"
			}
			res.json(data_res);	
		}
	});
};

//remove curso por admin
exports.removecursoadmin = function (req, res) {
	var id 		= req.params.id;
	var cedula 	= req.body.cedula;
	var data_res;
	var contNewArray=0;//contador para el nuevo array que alamacenera los cursos
	var bandera = 0; // Si la bandera cambia a 1 , se procede a ejecutar la funcion removecurso , mas por medida de seguridad
	//console.log("dstod",  datos);
	EstudianteQuery.FindOneEstudianteCedula(cedula , function (err, doc) {
		if(!err){
			var res_doc = doc;
			if (doc !== null) {
				for (var i = 0; i < doc.cursos.length; i++) {
					if (doc.cursos[i]._id == id) {
						bandera = 1;
						//contNewArray = contNewArray +1;
					} 
				}
				//<FOR> Lave de la bandera

				
				if (bandera == 1) { 
					var idestudiante   =  doc._id;
					var data = {
						nombres   : doc.nombres,
					    apellido1 : doc.apellido1,
					    apellido2 : doc.apellido2,
					    sexo      : doc.sexo,
						cursos 	  : []
					}
					
					console.log(idestudiante, data);

					EstudianteQuery.removeAllCursoEstudiante(idestudiante, function (err, doc2) {
						
						for (var i = 0; i < res_doc.cursos.length; i++) {
							if (res_doc.cursos[i]._id != id) {
								EstudianteQuery.addcursoEstudiante(cedula, res_doc.cursos[i] , function (err, doc3) {

									
								}); //<{> addcursoEstudiante

							} // <IF> 

						} // <For> { llave del for
						

						data_res={
							estado:0,//con exito
							curso:0
						}
						res.json(data_res);

					}); 
					//<{> updateEstudiante*/

				 } // <IF> If de la bandera			
			}
			else{
				data_res={
					estado:1,
					mensaje: "si existe"
				}
				res.json(data_res);
			}
		}else{//primer if
			data_res={
				estado:2,
				mensaje: "Error del sistema"
			}
			res.json(data_res);	
		}
	});
};

//listar estudiantes por cursos
exports.listcursosestudiantes = function (req, res) {
	var data_res;
	var curso = req.params.curso;
	EstudianteQuery.listcursosestudiantes(curso, function (err, doc) {
		if(!err){
			if (doc !== null) {
				data_res={
					doc:doc,
					estado:0,
					mensaje: "correctamente listado"
				}
				res.json(doc);
			}else{
				data_res={
					doc:doc,
					estado:1,
					mensaje: "No hay estudiante"
				}
				res.json(doc)
			}
		}else{
			data_res={
				doc:doc,
				estado:2,
				mensaje: "Error del servidor"
			}
			res.json(doc);
		}
	});
};
//actualizar  un estudiante
exports.reportesestudiantes = function (req, res, next) {
	var data_res;
	var curso = req.params.curso;
	EstudianteQuery.listcursosestudiantes(curso, function (err, docs){
		var data = {
				template:{'shortid':'rk0Lcxhhx'},
				options:{preview:false},
				data:{"people": docs}
			}
		
		var options = {
			uri: 'http://localhost:8001/api/report',
			method: 'POST',
			json: data
		}

		request(options).pipe(res);
		
	});
	
};

exports.reportesestudiantes2 = function (req, res, next) {
	EstudianteQuery.listEstudiante(function (err, docs){
		var data = {
				template:{'shortid':'r1tpwHm6g'},
				options:{preview:false},
				data:{"esi": docs}
			}
		
		var options = {
			uri: 'http://localhost:8001/api/report',
			method: 'POST',
			json: data
		}

		request(options).pipe(res);
		
	});
};


//estudiantes con prematricula
exports.estudiateprematricula = function (req, res, next) {
	EstudianteQuery.estudiateprematricula(function (err, doc) {
		if(!err){
			/*
			var data_res={
				doc:doc,
				estado:0,
				mensaje: "correctamente listado"
			}*/
			res.json(doc);
		}else{
			var data_res={
				doc:doc,
				estado:2,
				mensaje: "Error del servidor"
			}
			res.json(doc);
		}
	});
};

//===================================Pensiones ==============
//estudiantes con prematricula
exports.materia = function (req, res, next) {
	EstudianteQuery.materia(function (err, doc) {
		if(!err){
			res.json(doc);
		}else{
			var data_res={
				doc:doc,
				estado:2,
				mensaje: "Error del servidor"
			}
			res.json(doc);
		}
	});
};
//======================Materia de pagos
exports.materiapagos = function (req, res, next) {
	var id=req.params.id;

	
	EstudianteQuery.materiapagos(id,function (err, doc) {
		if(!err){
			res.json(doc);
		}else{
			var data_res={
				doc:doc,
				estado:2,
				mensaje: "Error del servidor"
			}
			res.json(doc);
		}
	});
};

exports.pagos = function (req, res, next) {
	var cedula   = req.body.cedula;
	var id_curso = req.body.id_curso;
	var meses    = req.body.meses;
	var respuesta;
	let bandera = 1; //Todo bien

	EstudianteQuery.FindOneEstudianteCedula(cedula,function (err, doc) {

		for (var i = 0; i < doc.cursos.length; i++) {

			if (doc.cursos[i].id_curso == id_curso) {
				
				//controla los meses que dura el curso
				if (doc.cursos[i].pagos.length < meses) {

					doc.cursos[i].pagos.push({
						mes: req.body.pagos[0].mes,
						cantidad: req.body.pagos[0].cantidad
					})

				}else{
					bandera   = 0;
				}

			} 
		} 

		///=====================

		if (bandera == 1) {
			EstudianteQuery.actualizarPagosPensiones(cedula, doc, function (err1, doc2) {
				libroInsetarDiario(req.body.pagos[0].cantidad);
				if (doc2.ok == 1) {
					respuesta={
						estado:1,
						mensaje:"correctamente"
					}
				}else{
					respuesta={
						estado:0,
						mensaje:"Error"
					}
				}
				res.json(respuesta);
			})
		}else{
			respuesta = {
				estado: 2,
				mensaje:"Canceló todos los meses"
			}
			res.json(respuesta);
		}



	});

	//=============Libro diario
	function libroInsetarDiario(numero) {
		
			var asiento ={ //datos para el libro diario
				//fecha: data.fecha_matricula,
				descripcion:"Cobro de pensión",
				debe:[{
					codigo_cuenta:"1.1.1.1",
					detalle:"caja",
					cantidad:numero * 1 
					}
					],
				haber:{
					codigo_cuenta:"2.1.4.1",
					detalle:"Cobro de pensión",
					cantidad: numero 
				},
				sugerencia:"Cobro de pensión",
			}
			libroDiario.createAsiento(asiento, function(err,doc){
				if (!err) {
					data_res ={	estado:"0" 	}
				}else{
					data_res ={	estado:"1" 	}
				}
			})
	}
	//=============END Libro diario
}
//contar estudiantes
exports.contarEstudiantes=function(req,res){
	var aux;
	var doc;
	var respuesta=[];
	var contar=[];
	curso.getallCurso(function (err,curso) {
		doc=curso;


			EstudianteQuery.contarEstudiantes(function(err,est){
	
			for (var k = 0; k < doc.length; k++) {
				//console.log("nombre",doc[k].nombre);
				aux=doc[k]._id;
				var a=0;
				var mensual=0;
				var matricula=0;
					for (var i = 0; i < est.length; i++) {		

						for (var j = 0; j < est[i].cursos.length; j++) {

							if (est[i].cursos[j].id_curso == doc[k]._id) {
								a=a+1;//contador estudiante

								//sumar la matricula
								var precio=est[i].cursos[j].precio_curso;
								matricula=matricula+parseInt(precio);
								//sumar los pagos
								for (var l = 0; l < est[i].cursos[j].pagos.length; l++) {
									mensual=mensual+est[i].cursos[j].pagos[l].cantidad;
								}
							}

						}

					}
					//console.log(mensual);
					respuesta.push({
						id:doc[k]._id,
						label:doc[k].nombre,
						value:a,
						mensual:mensual,
						matricula:matricula
					})
				}//
			//console.log("la1",respuesta);
			res.json(respuesta);
			});
		
	
	});//
	
};

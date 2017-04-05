var matriculaQuery 	= require("../models/qmatricula.js");
var libroDiario     = require("../models/qLibroDiario");
var estudianteQuery = require("../models/qestudiante");
//Matricular un estudiante al uncurso
exports.new = function (req, res, next){
	var data  = req.body;
	var cedula = data.cedula;
	var bandera = 0;
	var data_res ={
		estado:"10"
	}

	for (var i = 0; i < data.cursos.length; i++) {
		//datos para matricula
		if (data.cursos[i].estado == 0) {

			var datos_matricula = {
				fecha_matricula : data.fecha_matricula,
				cursos:{
					nombre:      data.cursos[i].nombre_curso,
					precio:           data.cursos[i].precio_curso,//precio de la matricula
					id:            data.cursos[i].id_curso
				},
				estudiantes:{
					id: data.id,
					nombres:data.nombres,
					apellido1:data.apellido1,
					apellido2:data.apellido2,
					cedula:data.cedula,
					sexo:data.sexo
				} 
			}
			matriculaQuery.createMatricula(datos_matricula, function (err, doc) {
				if (!err) {
					console.log("se guardo en matricula");
					data_res ={	estado:"0" 	}
				}else{
					console.log("no se guardo matricula");
				}
			});
		}//<If> matricula


		//libro diario
		if (data.cursos[i].estado == 0) {
			var numero= parseInt(data.cursos[i].precio_curso);
			var asiento ={ //datos para el libro diario
				//fecha: data.fecha_matricula,
				descripcion:"Ingresos por cobro de matrícula",
				debe:[{
					codigo_cuenta:"1.1.1.01",
					detalle:"caja",
					cantidad:numero * 0.88 
					},
					{
					codigo_cuenta:"1.1.3.10",
					detalle:"iva por cobrar",
					cantidad:numero * 0.12
					}],
				haber:{
					codigo_cuenta:"2.1.4.01",
					detalle:"servicios cobrados por anticipado",
					cantidad: numero 
				},
				sugerencia:"Matricúla",
			}
			libroDiario.createAsiento(asiento, function(err,docl){
				if (!err) {
					data_res ={	estado:"0" 	}
				}else{
					data_res ={	estado:"1" 	}
				}
			});
		}//<If> // libro diario

		//Estudiante cambiar de estado el curso en el estudiante
		if (data.cursos[i].estado == 0 || data.cursos[i].estado == 1) {
			
			if(bandera === 0){ //elese tenememos problemas al momento de guardar mas de 2cursos
				estudianteQuery.removeAllCursoEstudianteCedula(cedula, function (err, doc1) {


				});
				estudianteQuery.cambiarEstadoCurso(cedula,  data.cursos[i], function (err, doc2) {});
				bandera = 1;
					
			}else{
				estudianteQuery.addcursoEstudiante2(cedula, data.cursos[i], function (err, doc2) {});
				data_res ={
					estado:"0"
				}
			}
		}
		

	};//<FOR>

	/*
	matriculaQuery.verificarMatricula(datos, function (err, docs) {
		var data;
		if(! err){
			if (docs === null) {//si el usuario y el curso no existe entra a matricular
					matriculaQuery.createMatricula(datos, function(err, docs){			
					//llena el libro diario
					libroDiario.createAsiento(asiento, function(err,docs){
					
					data = {
						mensaje:"Matriculado con éxito",
						estado :"0",
						LD: "0"
					}
					
					res.json(data);		
					});

				});
			}else{
				data = {
					mensaje:"Ya esta matriculado",
					estado :"1"
				}
				res.json(data);
			}
		}
		else{
			data = {
					mensaje:"Error del servidor",
					estado :"2"
				}
			res.json(data);
		}
	})
	*/
	res.json(data_res);
};
var LibroDiarioQuery 	= require("../models/qLibroDiario.js");

exports.list = function(req, res, next){
	LibroDiarioQuery.list(function (err, docs){
		if(!err){
			res.json(docs);
		}else{
			res.json("Error en el servidor.. no se pudo listar", err);
		}
	});
};

//Devuelve una cuenta con un id
exports.codigocuenta = function (req, res, next) {

	var parametro= req.params.id;
	console.log("parametro", parametro);

	var respuesta = {
		codigo:"0",
		nombre:"no existe"
	}
	switch (parametro) {
	    default:
	       respuesta = {codigo:"0",nombre:"no existe"}
		break;
		//1   ACTIVO
		//1.2 ACTIVO CORRIENTE
		//1.1.1 Disponibles
	    case "caja":
	    case "1.1.1.1":
	        respuesta ={codigo:"1.1.1.1",	nombre:"caja" } 
	        break;
	    case "cajachica":
	    case "caja chica":
	    case "1.1.1.1.1":
	        respuesta ={codigo:"1.1.1.1.1",	nombre:"caja chica" } 
	        break;
	    case "bancos":
	    case "1.1.1.2":
	        respuesta ={codigo:"1.1.1.2", nombre:"bancos" }
	        break;
	    case "inversiones":
	    case "1.1.2":
	        respuesta ={codigo:"1.1.2", nombre:"inversiones" }
	        break; 
	    case "exigibles":
	    case "1.1.3":
	        respuesta ={codigo:"1.1.3", nombre:"exigibles" }
	        break;

	    case "documentos por cobrar":
	    case "documentosporcobrar":
	    case "1.1.3.1":
	        respuesta ={codigo:"1.1.3.1", nombre:"documentos por cobrar" }
	        break;
	    case "cuentas por cobrar":
	    case "cuentasporcobrar":
	    case "1.1.3.1":
	        respuesta ={codigo:"1.1.3.1", nombre:"cuentas por cobrar" }
	        break;
	    case "inventario mercaderia":
	    case "mercaderia":
	    case "1.1.4.1":
	        respuesta ={codigo:"1.1.4.1", nombre:"mercaderia" }
	        break; 
	    //Activos no corriente
	    //1.2.1.1 Fijos despreciables
	   	case "equipos de oficina":
	    case "equiposdeoficina":
	    case "1.2.1.1.1":
	        respuesta ={codigo:"1.2.1.1.1", nombre:"equipos de oficina" }
	        break;
	    case "equipos de computación":
	    case "equipos de computacion":
	    case "equiposdecomputacion":
	    case "1.2.1.1.2":
	        respuesta ={codigo:"1.2.1.1.2", nombre:"equipos de computación" }
	        break;
	    case "muebles y enseres":
	    case "mueblesyenseres":
	    case "1.2.1.1.3":
	        respuesta ={codigo:"1.2.1.1.3", nombre:"muebles" }
	        break;
	    case "Vehiculo":
	    case "vehículo":
	    case "1.2.1.1.4":
	        respuesta ={codigo:"1.2.1.1.4", nombre:"vehículo" }
	        break;
	    case "maquinaria":
	    case "1.2.1.1.5":
	        respuesta ={codigo:"1.2.1.1.5", nombre:"maquinaria" }
	        break;
	    case "edificio":
	    case "1.2.1.1.6":
	        respuesta ={codigo:"1.2.1.1.6", nombre:"edificio" }
	        break;
	    // Fijos no depreciables
	   	case "terreno":
	    case "1.2.1.2.1":
	        respuesta ={codigo:"1.2.1.2.1", nombre:"terreno" }
	        break;
	    //Otros Activsos
	   	case "gastos de constitucion":
	   	case "gastosdeconstitucion":
	    case "1.3.1":
	        respuesta ={codigo:"1.3.1", nombre:"gastos de constitución" }
	        break;
	    case "actas de constitucion":
	   	case "actasdeconstitucion":
	    case "1.3.1.2":
	        respuesta ={codigo:"1.3.1.2", nombre:"actas de constitución" }
	        break;
	    case "gastos de amortizacion":
	   	case "gastosdeamortizacion":
	    case "1.3.2":
	        respuesta ={codigo:"1.3.2", nombre:"gastos de amortizacion " }
	        break;
	    case "anticipo por arriendo":
	   	case "anticipoporarriendo":
	    case "1.3.3.1":
	        respuesta ={codigo:"1.3.3.1", nombre:"gastos de amortizacion " }
	        break;




	} 
	res.json(respuesta);
};


//Pa
//Devuelve todas las cuentas
exports.codigocuentas = function (req, res, next) {

	var parametro = 0;

	switch (parametro) {
	    default:
	        text = "Looking forward to the Weekend";
	        break;
	    case 6:
	        text = "Today is Saturday";
	        break;
	    case 0:
	        text = "Today is Sunday";
	}
	res.json("todas las cuentas");

};
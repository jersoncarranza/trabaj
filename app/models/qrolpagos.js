var models = require('./schema/rolPagos.js');

exports.createRol = function (data, callback) {

	var query ={
		cedula : data.cedula,
		mes    : data.mes,
	}
	var rolPagos =	new models.rolPagos(data);
	rolPagos.save(query,callback);
};

//Buscar: Parametros Cedula y mes

exports.existeRol = function (data, callback) {

	
	var query ={
		cedula : data.cedula,
		mes    : data.mes
	}
	var campos = {
		cedula:1,
		mes:1
	}
	models.rolPagos.find(query, campos, callback);
}
//Buscar : PArametro cedula

exports.cedulaRol = function (cedula, callback) {
	console.log("cedula", cedula);
	var query ={
		cedula : cedula
	}
	var campos = {
		date:1, 
		cargo:1,
		cedula:1,
		comision:1,
		iesspatrono:1,
		iesstrabajador:1,
		mes:1,
		nombre:1,
		prestamo:1,
		sueldo:1
	}
	models.rolPagos.find(query, campos, callback).sort( { mes : 1});
}

//fecha
exports.rolFecha=function (callback) {
	var exec=   [
		
		{ 
			$match: {cedula:'1722922364'}
		} ,
	    {	
	       $project:
	         {
	           year: { $year: "$date" },
	           month: { $month: "$date" },
	           day: { $dayOfMonth: "$date" },
	           hour: { $hour: "$date" },
	           minutes: { $minute: "$date" },
	           seconds: { $second: "$date" },
	           milliseconds: { $millisecond: "$date" },
	           dayOfYear: { $dayOfYear: "$date" },
	           dayOfWeek: { $dayOfWeek: "$date" },
	           week: { $week: "$date" },
	           cedula:1,
	           sueldo:1,
	           nombre:1
	   
	        }
	     }
	     ,
	     { 
	     	$group:{
		        _id:{nombre:'$nombre',cedula:'$cedula'},
		        averageQuantity: { $avg: "$sueldo" },
		        count: { $sum: 1 },
		        total:{$sum:"$sueldo"},
       			assetId:{$first:"$sueldo"}
			}	 
		}
	];
	models.rolPagos.aggregate(exec, callback)
};

//*********************meses*****************//
exports.rolFecha2=function (callback) {
	var exec=   [
	    {	
	       $project:
	         {
	           sueldo:1
	        }
	     }
	     ,
	     { 
	     	$group:{
		        averageQuantity: { $avg: "$sueldo" },
		        count: { $sum: 1 },
		        total:{$sum:"$sueldo"},
       		
			}	 
		}
	];
	models.rolPagos.aggregate(exec, callback);

};
//enero
exports.enero=function (callback) {
	var query={
		date: 
		{
        	$gte:"2017-01-01T00:00:00.000Z",
        	$lt: "2017-02-01T00:00:00.000Z"
    	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//febrero
exports.febrero=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-02-01T00:00:00.000Z", 	$lt: "2017-03-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//marzo
exports.marzo=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-03-01T00:00:00.000Z", 	$lt: "2017-04-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//abril
exports.abril=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-04-01T00:00:00.000Z", 	$lt: "2017-05-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//mayo
exports.mayo=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-05-01T00:00:00.000Z", 	$lt: "2017-06-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//junio
exports.junio=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-06-01T00:00:00.000Z", 	$lt: "2017-07-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//julio
exports.julio=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-07-01T00:00:00.000Z", 	$lt: "2017-08-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//agosto
exports.agosto=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-08-01T00:00:00.000Z", 	$lt: "2017-09-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//septiembre
exports.septiembre=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-09-01T00:00:00.000Z", 	$lt: "2017-10-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//octubre
exports.octubre=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-10-01T00:00:00.000Z", 	$lt: "2017-11-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//noviembre
exports.noviembre=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-11-01T00:00:00.000Z", 	$lt: "2017-12-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
//diciembre
exports.diciembre=function (callback) {
	var query={
		date: 	{ 	$gte:"2017-12-01T00:00:00.000Z", 	$lt: "2018-01-01T00:00:00.000Z"	}
	};
	var campos={};
	models.rolPagos.find(query, campos, callback);
};
/*

//fecha
exports.rolFecha=function (callback) {
	var exec=   [
		
		{ 
			$match: {cedula:'1722922364'}
		} ,
	    {	
	       $project:
	         {
	           year: { $year: "$date" },
	           month: { $month: "$date" },
	           day: { $dayOfMonth: "$date" },
	           hour: { $hour: "$date" },
	           minutes: { $minute: "$date" },
	           seconds: { $second: "$date" },
	           milliseconds: { $millisecond: "$date" },
	           dayOfYear: { $dayOfYear: "$date" },
	           dayOfWeek: { $dayOfWeek: "$date" },
	           week: { $week: "$date" },
	           cedula:1,
	           sueldo:1,
	           nombre:1
	   
	        }
	     }
	     ,
	     { 
	     	$group:{
		        _id:{nombre:'$nombre',cedula:'$cedula'},
		        averageQuantity: { $avg: "$sueldo" },
		        count: { $sum: 1 },
		        total:{$sum:"$sueldo"},
       			assetId:{$first:"$sueldo"}
			}	 
		}
	];
	models.rolPagos.aggregate(exec, callback)
};
*/
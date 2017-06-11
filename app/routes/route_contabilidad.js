var express = require('express');
var router  = express.Router();
var situacionInicialController = require('../controllers/situacionInicial_controller.js');
var contabilidadController = require('../controllers/libroDiario_controller.js');
var roldepagosController = require('../controllers/roldepagos_controller.js');
var flujoController = require('../controllers/contabilidad_controller.js');

//codigo cuentas

router.post('/contabilidad/situacioninicial/add', situacionInicialController.new);
router.get('/contabilidad/situacioninicial/list', situacionInicialController.list);
router.put('/contabilidad/situacioninicial/edit/:id', situacionInicialController.edit);

//Estado de situacion inicial
router.get('/contabilidad/situacioninicial/reporte', situacionInicialController.reporte);

//Listar todos los estudiantes
router.get('/contabilidad/librodiario/list', contabilidadController.list);
router.get('/contabilidad/total/:cuenta', contabilidadController.cuenta);
router.get('/contabilidad/situacioninicial/listesi', contabilidadController.listESI);

//Libro mayor
router.get('/contabilidad/libromayor/:cuenta', contabilidadController.mayor);

router.post('/roldepagos/guardar/', roldepagosController.guardar);
router.get('/roldepagos/mostrarcedula/:cedula', roldepagosController.mostrarCedula);
router.get('/roldepagos/fecha', roldepagosController.rolFecha);
router.get('/roldepagos/fecha2', roldepagosController.rolFecha2);

//Flujo de caja
router.get('/contabilidad/flujocaja/', flujoController.list);


module.exports = router;
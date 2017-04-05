var express = require('express');
var router  = express.Router();
var situacionInicialController = require('../controllers/situacionInicial_controller.js');
var contabilidadController = require('../controllers/libroDiario_controller.js');
//codigo cuentas

router.post('/contabilidad/situacioninicial/add', situacionInicialController.new)
router.get('/contabilidad/situacioninicial/list', situacionInicialController.list);

//Listar todos los estudiantes
router.get('/contabilidad/librodiario/list', contabilidadController.list);



module.exports = router;
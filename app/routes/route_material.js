var express = require('express');
var router  = express.Router();
var material = require('../controllers/material_controller.js');


var arriendoController = require('../controllers/arriendo_controller.js');


//guardar los materiales
router.post('/material/guardar/', material.guardar);
//listar todos 
router.get('/material/listar/', material.listar);
//listar por su id
router.get('/material/listar/:id', material.listarId);
//Editar
router.put('/material/editar/:id', material.editarId);
//venta
router.put('/material/venta/:id',material.venta);

//Arriendo
router.post('/arriendo/new', arriendoController.new);
router.get('/arriendo/list', arriendoController.list);

module.exports = router;
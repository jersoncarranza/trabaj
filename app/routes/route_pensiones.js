var express = require('express');
var router  = express.Router();
var pensiones = require('../controllers/pensiones_controller.js');

//Listar todos los estudiantes
router.get('/pensiones/list/', pensiones.list);
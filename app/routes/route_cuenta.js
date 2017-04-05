var express = require('express');
var router = express.Router();
var cuentaController = require('../controllers/cuenta_controller.js');

//guardar un curso
router.post('/cuenta/register', cuentaController.new);	
//obtener todos los cursos
router.get('/cuenta/list', cuentaController.getall);	
//listar un  curso
router.get('/cuenta/list/:id', cuentaController.getid);	
//editar curso
router.put('/cuenta/editar/:id', cuentaController.editar);
//eliminar
router.delete('/cuenta/eliminar/:id', cuentaController.eliminar);




module.exports = router;
var express = require('express');
var router = express.Router();
var cuentaController = require('../controllers/cuenta_controller.js');

//guardar cuenta
router.post('/cuenta/register', cuentaController.new);	
//obtener todos las cuenta
router.get('/cuenta/list', cuentaController.getall);	
//listar un  cuenta
router.get('/cuenta/list/:id', cuentaController.getid);	
//listar un  cuenta
//router.get('/cuenta/listipo/:id', cuentaController.getalltipo);	
//editar cuenta
router.put('/cuenta/editar/:id', cuentaController.editar);
//eliminar cuenta
router.delete('/cuenta/eliminar/:id', cuentaController.eliminar);




module.exports = router;
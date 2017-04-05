var express = require('express');
var router = express.Router();
var fundacionController = require('../controllers/fundacion_controller.js');

//
router.post('/fundacion/register', fundacionController.new);	
//
router.get('/fundacion/getall', fundacionController.getOne);	
//
//router.get('/curso/getid/:id', fundacionController.getid);
//eliminar un curso por id	
//router.delete('/curso/remove/:id', fundacionController.remove);	
//
router.put('/fundacion/edit/:id', fundacionController.edit);	


module.exports = router;
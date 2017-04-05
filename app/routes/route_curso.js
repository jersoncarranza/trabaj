var express = require('express');
var router = express.Router();
var cursoController = require('../controllers/curso_controller.js');

//guardar un curso
router.post('/curso/register', cursoController.new);	
//obtener todos los cursos
router.get('/curso/getall', cursoController.getall);	
//obtener un curso por id
router.get('/curso/getid/:id', cursoController.getid);
//eliminar un curso por id	
router.delete('/curso/remove/:id', cursoController.remove);	
//modificar un curso
router.put('/curso/edit/:id', cursoController.edit);	


module.exports = router;
var express = require('express');
var router = express.Router();
var teacherController = require('../controllers/teacher_controller.js');

//Listar todos los profesores nomina principal
router.get('/profesor/list', teacherController.list);	
//Litar los atributos de cada profesor 	
router.get('/profesor/list/:id', teacherController.listId);	

//añadir un profesor
router.post('/profesor/register', teacherController.new);	
//lista los profesores
router.get('/profesor/listTeacher', teacherController.listTeacher);	
//eliminar  un profesor
router.delete('/profesor/removeTeacher/:id', teacherController.removeTeacher);
//actualizar un profesor
router.put('/profesor/updateTeacher/:id', teacherController.updateTeacher);


//router.put('/profesor/update/:id', teacherController.updateTeacher);	
//votos para estar en la lista principal
router.put('/profesor/updatevotos/:id', teacherController.updatevotos);	

//resultados individual de cada profesor
router.get('/profesor/calificacion/:id', teacherController.calificacion);	
//resultaods de todos los profesores
router.get('/profesor/calificacionall/', teacherController.calificacionall);	

module.exports = router;
var express = require('express');
var router  = express.Router();
var estudianteController = require('../controllers/estudiante_controller.js');

//Listar todos los estudiantes
router.get('/estudiante/list', estudianteController.list);
//Listar un estudiante por su id
router.get('/estudiante/list/:id', estudianteController.listId);
//Listar estudiante por su cedula
router.get('/estudiante/listcedula/:id',estudianteController.listCedula);
//Añadir un estudiante
router.post('/estudiante/register', estudianteController.new);
//añadir admin
router.post('/estudiante/registeradmin', estudianteController.newadmin);

//eliminar un estudiante por su id
router.delete('/estudiante/remove/:id', estudianteController.removeEstudiante);
//actualizar un estudiante
router.put('/estudiante/update/:id', estudianteController.updateEstudiante);
//login de un estudiante
router.post('/estudiante/login', estudianteController.login);
//Remove course por alumno
router.put('/estudiante/removecurso/:id', estudianteController.removecurso);
//Remove course por admin
router.put('/estudiante/removecursoadmin/:id', estudianteController.removecursoadmin); 
//listar estudiante por cursos
router.get('/estudiante/listcursos/:curso', estudianteController.listcursosestudiantes);
//listar con id
router.get('/estudiante/reportes/:curso', estudianteController.reportesestudiantes);
//listar son id
router.get('/estudiante/reportes/', estudianteController.reportesestudiantes2);
//listar estudiates con prematrícula
router.get('/estudiates/prematricula/', estudianteController.estudiateprematricula);
//contar estudia◙tes por  cada curso
router.get('/estudiantes/contar/', estudianteController.contarEstudiantes);


router.get('/pensiones/materia/',estudianteController.materia);

//pagos pensiones
router.get('/pensiones/materiapagos/:id',estudianteController.materiapagos);
//pago pensiones
router.post('/pensiones/materiapagos/',estudianteController.pagos);


module.exports = router;
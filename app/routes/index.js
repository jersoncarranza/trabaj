// **************  Importamos los módulos
var express = require('express');
var router = express.Router();

//**************  Carga de controladores
var webController = require('../controllers/web_controller');

// **************  Gestión de rutas index, contacto y acerca de
router.get("/", webController.index);





module.exports = router;
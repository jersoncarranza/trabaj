var express = require('express');
var router  = express.Router();
var matriculaController = require('../controllers/matricula_controller.js');
//matricula 
router.post('/matricula/new', matriculaController.new);

module.exports = router;
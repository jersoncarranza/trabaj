var express = require('express');
var router  = express.Router();
var arriendoController = require('../controllers/arriendo_controller.js');

router.post('/arriendo/new', arriendoController.new);
router.get('/arriendo/list', arriendoController.list);
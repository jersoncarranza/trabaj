var env = process.env.NODE_ENV || 'development',
	 bodyParser = require('body-parser'),
	 routes     = require('./routes/index.js');
	 
	 users     = require('./routes/users.js');//users
	 profesores     = require('./routes/route_profesor.js');//
	 cursos     = require('./routes/route_curso.js');//
	 fundacion = require('./routes/route_fundacion.js');
	 estudiante = require('./routes/route_estudiante.js');
	 matricula = require('./routes/route_matricula.js');
	 contabilidad = require('./routes/route_contabilidad.js');
	 cuenta = require('./routes/route_cuenta.js');

	 express    = require('express'),
	 exphbs		= require('express-handlebars'),
	 path		= require('path'),
	 cookieParser = require('cookie-parser'),
	 session = require('express-session'),
 	 expressValidator = require('express-validator'),
 	flash = require('connect-flash'),
 	passport = require('passport'),
 	cors = require('cors'),
 	formidable = require("express-formidable"),
 	LocalStrategy = require('passport-local').Strategy,
 	favicon = require('serve-favicon');
 	//mongoose = require('mongoose');
 	//mongo = require('mongodb'),

 	//mongoose.connect(' mongodb://l:l@ds038379.mlab.com:38379/mlab');
 	
 	
	
	var ExpressServer = function (config) {
		config = config || {};
	
		this.expressServer = express();
		this.expressServer.engine('handlebars', exphbs ({defaultLayout: 'layout', layoutsDir: 'app/public/layouts'}));
		this.expressServer.set('view engine', 'handlebars');
		this.expressServer.set('views', path.join(__dirname, './public/')); 
		this.expressServer.use(bodyParser.json());
		this.expressServer.use(cors());
		this.expressServer.use(bodyParser.urlencoded({extended:true}));	
		this.expressServer.use(express.static("./app/public"));
		this.expressServer.use(cookieParser()); 
		this.expressServer.use(favicon(__dirname + '/public/icon/favicon.ico')); 
		this.expressServer.use(session({
			secret:'secret',
			saveUninitialized:true,
			resave: true
		}));

				// passport init
		this.expressServer.use(passport.initialize());
		this.expressServer.use(passport.session());

		// express validator
		this.expressServer.use(expressValidator({
			errorFormatter: function (param, msg, value) {
				var namespace = param.split('.')
				, root = namespace.shift()
				, formParam = root;

				while(namespace.length){
					formParam += '[' + namespace.shift() + ']';
				}
				return{
					param: formParam,
					msg	 : msg,
					value: value
				};
			}
		}));
		//connect flash
		this.expressServer.use(flash());

		//formidable imagen
		this.expressServer.use(formidable.parse({ keepExtensions: true }));

		// global var
		this.expressServer.use(function (req, res, next) {
			res.locals.success_msg = req.flash('success_msg');
			res.locals.error_msg   = req.flash('error_msg');
			res.locals.error   = req.flash('error');
			res.locals.user    = req.user || null;
			next();
			});

		
		this.expressServer.use('/', routes); 
		this.expressServer.use('/', users); 
		this.expressServer.use('/', profesores); 
		this.expressServer.use('/', cursos); 
		this.expressServer.use('/', fundacion); 
		this.expressServer.use('/', estudiante); 
		this.expressServer.use('/', matricula); 
		this.expressServer.use('/', contabilidad); 
		this.expressServer.use('/', cuenta); 
		};

	module.exports = ExpressServer;
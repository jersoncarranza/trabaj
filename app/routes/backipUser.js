///************passport
	passport.use(new LocalStrategy(
		function (username, password , done) {
			User.getUserByEmail(username, function (err, user) {
				if(err) throw err;
				if(!user){return done(null, false, {message:'Usuario Desconocido'});}
				User.comparePassword(password, user.password, function (err, isMatch) {
					if(err) throw err;
					if(isMatch){
						return done(null, user);
					}else{
						return done(null, false, {message: 'Contraseña invalida'})
					}
				});
			});
	}));

	passport.serializeUser(function (user,done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.getUserById(id,function (err, user) {
			done(err, user);
		});
	});


	router.post('/', function (req, res, next) {
		var name = req.body.name;
		var email = req.body.email;
		var password = req.body.password;
		var password2 = req.body.password2;

		req.checkBody('name', 'Ponga un nombre').notEmpty();
		req.checkBody('email', 'Escriba un correo').notEmpty();
		req.checkBody('email', 'Escriba un correo valido').isEmail();
		req.checkBody('password', 'Escriba una contraseña').notEmpty();
		req.checkBody('password2', 'Escriba la misma contraseña').equals(req.body.password);
		var errors = req.validationErrors();

		if(errors){
			res.render('register',{
				errors:errors
			});
		}else{
			var newUser ={
				name: name,
				email:email,
				password:password
			};
			
			UserQuery.createUser(newUser, function (err, user) {
				console.log("Create user", user);
				if (user === 1) {
					console.log("REgistrate");
					req.flash('success_msg','Este correo ya está registrado, Inicia sesión');
					res.render('register');
				}else{
					//req.flash('success_msg','Gracias por regístrate ');
					console.log("Gracias");
					/*
					passport.authenticate('local')(req, res, function () {
            			res.redirect('/');
        			});
        			*/
            		res.render('index');
				}

			});
			 
		} 
	});

	router.post('/login',
		passport.authenticate('local', {successRedirect:'/', failureRedirect:'/',failureFlash: true}),
  			function(req, res) {
  			//req.flash('success_msg','Bienvenido');
  			console.log("heyy", username);
    		res.redirect('/');
 	});
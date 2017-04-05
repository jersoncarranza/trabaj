var mongoose = require('mongoose');
//var db = mongoose.connection;
var CuentaSchema = mongoose.Schema({
	nombrecuenta:{type: String },
	codigocuenta:{type: String },
	iduser:{type: String, default:"0"}

});

//var User = module.exports = mongoose.model('User', CuentaSchema);
var Cuenta = mongoose.model('Cuenta', CuentaSchema);
exports.Cuenta = Cuenta;
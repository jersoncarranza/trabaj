var mongoose = require('mongoose');
//var db = mongoose.connection;
var ArriendoSchema = mongoose.Schema({
	fecha: {type: Date, default: Date.now },
	anio:{type: Number,default:0 },
	meses:{type: String },
	cantidad:{type: Number, default:0},
	mesnumero:{type:Number}

});

//var User = module.exports = mongoose.model('User', ArriendoSchema);
var Arriendo = mongoose.model('Arriendo', ArriendoSchema);
exports.Arriendo = Arriendo;
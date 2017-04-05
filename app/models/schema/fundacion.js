var mongoose = require('mongoose');

var FundacionSchema = mongoose.Schema({

	mision:{type: String },
	vision:{type: String },
	somos:{type: String}


});

//var User = module.exports = mongoose.model('User', FundacionSchema);
var Fundacion = mongoose.model('Fundacion', FundacionSchema);
exports.Fundacion = Fundacion;
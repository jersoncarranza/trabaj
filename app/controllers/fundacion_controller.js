var FundacionQuery 	= require("../models/qfundacion.js");

//
exports.new = function (req, res, next) {
		var data = req.body;
		FundacionQuery.createFundacion(data , function(err, docs){
			if(! err){
				res.json(docs);
			}
			else{
				res.render(err);
			}
		});
	};
//
exports.getOne = function(req, res, next){
	FundacionQuery.getFundacion(function(err, docs){
		if(! err){
			res.json(docs);
		}
		else{
			res.render(err);
		}
	});
};

//
exports.edit = function(req, res, next){
	var id = req.params.id;
	var data = req.body; 
	FundacionQuery.editFundacion(id, data , function(err, docs){
		if(! err){
			res.json(docs);
		}
		else{
			res.render(err);
		}
	});
};
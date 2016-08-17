var express = require('express');
var router = express.Router();

var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');

var bp = require('body-parser');

router.use(bp.urlencoded({extended: true}));
router.use(bp.json());

var appRoot = process.cwd();

var cache = require(appRoot + '/middleware/caching.js');

var Shout = require(appRoot + '/models/shout.js');

router.post('/', function(req, res){
	var shout = new Shout();
	shout.bodyText = req.body.bodyText;
	shout.imagePath = req.body.imageUrl;
	shout.createdAt = new Date();
	shout.save(sendResponse);

	function sendResponse(err) {
		if (err) {
			res.json({result: 'fail'});
		} else {
			res.json({result: 'success'});
		}
	}
});

router.get('/', function(req, res){
	if (req.headers.caller !== 'angular') {
		res.redirect('/');
	} else {
	Shout.find().sort({createdAt: "desc"}).skip(req.query.p * 10).limit(10).exec(function(err, data){
			if (err) {
				res.json({error: 'Something went wrong'});
			} else {
				res.json(data);
			}
		});
	}
});

module.exports = router;

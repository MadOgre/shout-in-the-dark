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

var Shout = require(appRoot + '/models/shout.js');

var memify = require(appRoot + '/helpers/memify.js');

router.post('/', function(req, res){
	var urlObj = url.parse(req.body.imageUrl);
	var protocol = '';
	if (urlObj.protocol === 'http:') {
		protocol = http;
	} else if (urlObj.protocol === 'https:') {
		protocol = https;
	}
	var id = new Date().valueOf().toString();
	var fileName = id + '.png';
	var filePath = appRoot + '/public/img/shouts/' + fileName;
	var writeStream = fs.createWriteStream(filePath);
	protocol.get(req.body.imageUrl, function(res){
		res.pipe(writeStream);
	}).on('error', function(err){
		res.status(500).send({Error: err});
		return console.error(err);
	});
	writeStream.on('close', createShout);
	function createShout(err) {
		if (err) {
			res.status(500).send({Error: err});
			return console.error(err);
		}
		memify(filePath, req.body.bodyText, saveShout);
	}
	function saveShout(err) {
		if (err) {
			res.status(500).send({Error: err});
			return console.error(err);
		}
		var shout = new Shout();
		shout.bodyText = req.body.bodyText;
		shout.imagePath = 'img/shouts/' + fileName;
		shout.save(sendResponse);
	}
	function sendResponse(err) {
		if (err) {
			res.json({result: 'fail'});
		} else {
			res.json({result: 'success'});
		}
	}
});

router.get('/', function(req, res){
	Shout.find(function(err, data){
		if (err) {
			res.json({error: 'Something went wrong'});
		} else {
			res.json(data);
		}
	});
});

module.exports = router;

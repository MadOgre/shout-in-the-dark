var express = require("express");
var router = express.Router();

var http = require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");
var path = require("path");

var Shout = require(__dirname + "/../models/shout.js");

var memify = require(__dirname + "/../helpers/memify.js");

router.post("/", function(req, res){
	var urlObj = url.parse(req.body.imageUrl);
	var protocol = "";
	if (urlObj.protocol === "http:") {
		protocol = http;
	} else if (urlObj.protocol === "https:") {
		protocol = https;
	}
	var id = new Date().valueOf().toString();
	var fileName = id + ".png";
	var filePath = __dirname + "/../public/img/shouts/" + fileName;
	var writeStream = fs.createWriteStream(filePath);
	console.log(filePath);
	protocol.get(req.body.imageUrl, function(res){
		res.pipe(writeStream);
	}).on("error", function(err){
		res.status(500).send({Error: err});
		return console.error(err);
	});
	writeStream.on("close", createShout);
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
		shout.imagePath = filePath;
		shout.save(sendResponse);
	}
	function sendResponse(err) {
		if (err) {
			res.json({result: "fail"});
		} else {
			res.json({result: "success"});
		}
	}
});

router.get("/", function(req, res){
	Shout.find(function(err, data){
		if (err) {
			res.json({error: "Something went wrong"});
		} else {
			res.json(data);
		}
	});
});

module.exports = router;

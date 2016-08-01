var express = require("express");
var router = express.Router();

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var getImages = require(__dirname + "/../helpers/get_images.js");
var memify = require(__dirname + "/../helpers/memify.js");

router.get("/", function(req, res){
	getImages(req.query.q, function(err, data){
		if (err) {
				console.error("Error: " + err);
				res.status(500).send({Error: err});
		} else {
			var id = new Date().valueOf().toString();
			var fileName = id + ".png";
			var readStream = fs.createReadStream(__dirname + "/../public/img/blank.png");
			var writeStream = fs.createWriteStream(__dirname + "/../public/img/" + fileName);
			readStream.pipe(writeStream);
			writeStream.on("close", function(err){
				if (err) {
					console.error("Error: " + err);
					res.status(500).send({Error: err});
				} else {
					memify(__dirname + "/../public/img/" + fileName, req.query.q, function(err){
						if (err) {
							console.error("Error: " + err);
							res.status(500).send({Error: err});
						} else {
							var response = {
								transparency: "/img/" + fileName,
								images: []
							};
							data.forEach(function(item){
								response.images.push({
									thumb: item.thumbnail.url,
									full: item.url
								});
							});
							res.json(response);
							setTimeout(function(){
								fs.unlink(__dirname + "/../public/img/" + fileName, function(err){
									return console.error(err);
								});
							}, 5000);
						}
					});
				}
			});			
		}
	});
});

module.exports = router;
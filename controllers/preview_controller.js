var express = require("express");
var router = express.Router();

var fs = require("fs");

var getImages = require(__dirname + "/../helpers/get_images.js");
var memify = require(__dirname + "/../helpers/memify.js");

router.get("/", function(req, res){
	var id = new Date().valueOf().toString();
	var fileName = id + ".png";
	var imagesData = {};
	getImages(req.query.q, parseResponse);
	
	function parseResponse(err, data) {
		if (err) {
			console.error("Error: " + err);
			return res.status(500).send({Error: err});
		}
		imagesData = data;
		var readStream = fs.createReadStream(__dirname + "/../public/img/blank.png");
		var writeStream = fs.createWriteStream(__dirname + "/../public/img/" + fileName);
		readStream.pipe(writeStream);
		writeStream.on("close", generateAndSendResponse);					
	}

	function generateAndSendResponse(err) {
		if (err) {
			console.error("Error: " + err);
			return res.status(500).send({Error: err});
		}
		memify(__dirname + "/../public/img/" + fileName, req.query.q, sendResponse);	
	}

	function sendResponse(err) {
		if (err) {
			console.error("Error: " + err);
			return res.status(500).send({Error: err});
		}
		var response = {
			transparency: "/img/" + fileName,
			images: []
		};
		imagesData.forEach(function(item){
			response.images.push({
				thumb: item.thumbnail.url,
				full: item.url
			});
		});
		res.json(response);
		deleteFileTimer(__dirname + "/../public/img/" + fileName, 5000, function(err){
			if (err) {
				return console.error(err);
			}
		});
	}

	function deleteFileTimer(path, delay, callback) {
		setTimeout(function(){
			fs.unlink(path, function(err){
				if (err) {
					callback(err)
				} else {
					callback(null)
				}
			});
		}, delay)
	}	
});

module.exports = router;
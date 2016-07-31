var express = require("express");
var app = express();

var gm = require('gm');
var bp = require("body-parser");

var cors = require("cors");

var morgan = require("morgan");

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var googleImages = require('google-images');
var client = googleImages('004462654191392209191:2ld2qd1m6r4', 'AIzaSyC8T94VqOmP24H2Xt9dyVjcGEbsp_7sp5M');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());

app.use(morgan("combined"));

app.use(bp.urlencoded({extended: true}));

function memify(path, text, callback) {
	gm(path)
	.fill("white")
	.stroke("black")
	.strokeWidth(1)
	.font("/usr/share/fonts/truetype/msttcorefonts/Arial_Bold.ttf")
	.fontSize(50)
	.drawText(0, 0, text, "Center")
	.write(path, function (err) {
	  if (!err) callback();
	  if (err) {
	  	callback(err);
	  }
	});
}

app.use(express.static(__dirname + "/public"));

app.get("/memegen", function(req,res){
	res.sendFile(__dirname + "/public/memegen.html");
});

app.post("/memegen", function(req, res){
	var id = new Date().valueOf().toString();
	var fileName = id + ".png";
	var readStream = fs.createReadStream(__dirname + "/public/img/blank.png");
	var writeStream = fs.createWriteStream(__dirname + "/public/img/" + fileName);
	readStream.pipe(writeStream);
	writeStream.on("close", function(err){
		if (err) {
			console.error("Error: " + err);
			res.status(500).send({Error: err});
		} else {
			memify(__dirname + "/public/img/" + fileName, req.body.text, function(err){
				if (err) {
					console.error("Error: " + err);
					res.status(500).send({Error: err});
				} else {
				res.redirect("/memegen/preview/" + id + "/" + req.body.text);
				}
			});
		}
	});
});

function getGoogleImages(query, callback) {
	// client.search(query, {size: 'medium'}).then(
	// 	function(data){
	// 		callback(null, data);
	// 	},
	// 	function(error){
	// 		callback(error);
	// 	}
	// );
	var data = require("./mock_data.js");
	callback(null, data);
}

app.get("/memegen/preview/:id/:text", function(req, res){
	getGoogleImages(req.params.text, function(err, data){
		if (err) {
				console.error("Error: " + err);
				res.status(500).send({Error: err});
		} else {
		//res.json(data);
		res.render("preview", {main_file_url: "/img/" + req.params.id + ".png",
													 google_results: data});
		}
	})
});

app.get("/preview", function(req, res){
	getGoogleImages(req.query.q, function(err, data){
		if (err) {
				console.error("Error: " + err);
				res.status(500).send({Error: err});
		} else {
			var id = new Date().valueOf().toString();
			var fileName = id + ".png";
			var readStream = fs.createReadStream(__dirname + "/public/img/blank.png");
			var writeStream = fs.createWriteStream(__dirname + "/public/img/" + fileName);
			readStream.pipe(writeStream);
			writeStream.on("close", function(err){
				if (err) {
					console.error("Error: " + err);
					res.status(500).send({Error: err});
				} else {
					memify(__dirname + "/public/img/" + fileName, req.query.q, function(err){
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
								fs.unlink(__dirname + "/public/img/" + fileName, function(err){
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


app.use(["/hello","/goodbye"], function(req, res){
	res.sendFile(__dirname + "/public/index.html");
})

app.use("*", function(req, res){
	res.redirect("/");
});

app.listen("3000");
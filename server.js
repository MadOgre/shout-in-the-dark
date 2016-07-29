var express = require("express");
var app = express();

var gm = require('gm');
var bp = require("body-parser");

var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

var googleImages = require('google-images');
var client = googleImages('002933971227871447216:skeh5hd6yhg', 'AIzaSyDiuzKEP4ZEAT9TN5Rd5_ZZ_fuuMlDF7EA');

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bp.urlencoded({extended: true}));

function memify(path, text, callback) {
	gm(path)
	.fill("white")
	.stroke("black")
	.strokeWidth(3)
	.font("/usr/share/fonts/truetype/msttcorefonts/Verdana_Bold.ttf")
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
	// var imageUrl = req.body.url;
	// console.log("IMAGE URL: " + imageUrl);
	var fileName = new Date().valueOf().toString() + ".png"; //path.parse(url.parse(imageUrl).pathname).base;
	console.log(fileName);
	var readStream = fs.createReadStream(__dirname + "/public/img/blank.png");
	var writeStream = fs.createWriteStream(__dirname + "/public/img/" + fileName);
	readStream.pipe(writeStream);
	// http.get(imageUrl, function(data){
	// 	data.pipe(writeStream);
	// 	//res.sendFile(__dirname + "/public/img/" + fileName);
	// });
	writeStream.on("close", function(err){
		memify(__dirname + "/public/img/" + fileName, req.body.text, function(err){
			res.sendFile(__dirname + "/public/img/" + fileName);
		});
	})
});

function getGoogleImages(query, callback) {
	client.search(query, {size: 'huge'}).then(function(data){
		callback(data);
	});
}

app.get("/memegen/preview/:id/:text", function(req, res){
	getGoogleImages(req.params.text, function(data){
		//res.json(data);
		res.render("preview", {main_file_url: "/img/" + req.params.id + ".png",
													 google_results: data});
	})
});


app.use(["/hello","/goodbye"], function(req, res){
	res.sendFile(__dirname + "/public/index.html");
})

app.use("*", function(req, res){
	res.redirect("/");
});

app.listen("3000");
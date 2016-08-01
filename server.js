var express = require("express");
var app = express();

var bp = require("body-parser");

//fixing the cross origin request error
var cors = require("cors");

//enabling logger (disable in production)
var morgan = require("morgan");

//connecting views
app.set("view engine", "ejs");
app.set("views", "views");

//connecting global middleware
app.use(cors());
app.use(morgan("combined"));
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//connecting controllers
app.use("/preview", require(__dirname + "/controllers/preview_controller.js"));
//app.use("/shout", require(__dirname + "/controllers/shout_controller.js"));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/public/memegen.html");
});

//default route redirects to root
app.use("*", function(req, res){
	res.redirect("/");
});

app.listen("3000");
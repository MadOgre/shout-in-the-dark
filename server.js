var express = require('express');
var app = express();

var appRoot = process.cwd();

var port = process.env.NODE_PORT || 3000;

var environment = app.get("env");

var config = require(appRoot + '/config.js');

var mongoose = require('mongoose');

//replace the mongoose promise with global promise
mongoose.Promise = global.Promise;

//connect to the database
var database_url = config.database.url[environment];
var credentials = config.database.credentials[environment];
mongoose.connect(database_url, credentials);

//fixing the cross origin request error
var cors = require('cors');

//connecting global middleware
app.use(cors());

//connecting conditional middleware
require('./environment')(app);

//connecting controllers
require('./controllers')(app);

//default route sends index.html
app.use('*', function(req, res){
	res.sendFile(appRoot + '/public/index.html');
});

app.listen(port);
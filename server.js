var express = require('express');
var app = express();

var bp = require('body-parser');

var appRoot = process.cwd();

var config = require(appRoot + '/config.js');

var mongoose = require('mongoose');

//replace the mongoose promise with global promise
mongoose.Promise = global.Promise;

//connect to the database
mongoose.connect(config.database_url);

//fixing the cross origin request error
var cors = require('cors');

//enabling logger (disabled in production)
if (app.get('env') === 'development') {
	var morgan = require('morgan');
}

//connecting global middleware
app.use(cors());
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

//connecting conditional middleware
if (app.get('env') === 'development') {
	app.use(morgan('combined'));
	app.use(express.static(appRoot + '/public'));
}

//connecting controllers
app.use('/preview', require(appRoot + '/controllers/preview_controller.js'));
app.use('/shout', require(appRoot + '/controllers/shout_controller.js'));

//default route sends index.html
app.use('*', function(req, res){
	res.sendFile(appRoot + '/public/index.html');
});

app.listen('3000');

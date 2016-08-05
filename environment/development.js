var express = require('express');
var morgan = require('morgan');

module.exports = function(app) {
	app.use(morgan('combined'));
	app.use(express.static(process.cwd() + '/public'));
}
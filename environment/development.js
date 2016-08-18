var express = require('express');
var morgan = require('morgan');

module.exports = function(app) {
	app.use(morgan('short'));
	app.use(express.static(process.cwd() + '/public'));
}
var express = require('express');
var router = express.Router();
var request = require('request');

var appRoot = process.cwd();

var cache = require(appRoot + '/middleware/caching.js');

router.use('/', cache(5 * 60), function(req, res) {  
	console.log(req.url);
  req.pipe(request(req.url.substr(1))).pipe(res);
});


module.exports = router;
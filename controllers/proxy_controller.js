var express = require('express');
var router = express.Router();
var request = require('request');

router.use('/', function(req, res) {  
	console.log(req.url);
  req.pipe(request(req.url.substr(1))).pipe(res);
});


module.exports = router;
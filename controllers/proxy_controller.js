var express = require('express');
var router = express.Router();
var request = require('request');

httpProxy = require('http-proxy');



router.use('/', function(req, res) {  
	console.log(req.url);
  //var url = apiServerHost + req.url;
  req.pipe(request(req.url.substr(1))).pipe(res);
});


module.exports = router;
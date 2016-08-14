var express = require('express');
var router = express.Router();

var fs = require('fs');
var bp = require('body-parser');

router.use(bp.urlencoded({extended: true}));
router.use(bp.json());

var appRoot = process.cwd();

var cache = require(appRoot + '/middleware/caching.js');

var config = require(appRoot + '/config.js');

var getImages = require(appRoot + '/helpers/get_images.js');

router.get('/', cache(5 * 60), function(req, res){
	getImages(req.query.q, sendResponse);

	function sendResponse(err, data) {
		if (err) {
			console.error('Error: ' + err);
			return res.status(500).send({Error: err});
		}
		var response = {
			images: []
		};
		data.forEach(function(item){
			response.images.push({
				thumb: item.thumbnail.url,
				full: item.url
			});
		});
		res.json(response);
	}
});

module.exports = router;
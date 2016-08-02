var gm = require('gm');

var SHOUT_WIDTH = 640;
var SHOUT_HEIGHT = 920;

module.exports = function (path, text, callback) {
	gm(path).geometry(640, 920, '^')
	.stream(function(err, stdout){
		gm(stdout).size(modifyImage);
	});
	function modifyImage(err, data) {
		if (err) return callback(err);
		var cropBox = getCropBox(data.width, data.height);
		gm(path)
		.geometry(640, 920, '^')
		.crop(SHOUT_WIDTH, SHOUT_HEIGHT, cropBox.x, cropBox.y)
		.fill("white")
		.stroke("black")
		.strokeWidth(1)
		.font("Verdana")
		.fontSize(50)
		.drawText(0, 0, text, "Center")
		.write(path, function (err) {
		  if (!err) {
		  	callback(null);
		 	} else {
		  	callback(err);
		  }
		});		
	}
};

function getCropBox(width, height) {
	result = {};
	if (width != SHOUT_WIDTH) {
		result.x = Math.floor(width / 2) - SHOUT_WIDTH / 2;
		result.y = 0;
	} else {
		result.x = 0;
		result.y = Math.floor(height / 2) - SHOUT_HEIGHT / 2;
	}
	return result;
}

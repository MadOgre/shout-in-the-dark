var gm = require('gm');

module.exports = function (path, text, callback) {
	gm(path)
	.fill("white")
	.stroke("black")
	.strokeWidth(1)
	.font("Verdana")
	.fontSize(50)
	.drawText(0, 0, text, "Center")
	.write(path, function (err) {
	  if (!err) callback();
	  if (err) {
	  	callback(err);
	  }
	});
}

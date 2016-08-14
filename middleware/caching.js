module.exports = function(seconds) {
	return function(req, res, next) {
		res.setHeader('Cache-Control', 'public, max-age=' + seconds);
	  next();
	};
};
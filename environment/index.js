module.exports = function(app) {
	require('./' + app.get('env'))(app);
}
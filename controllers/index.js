module.exports = function(app) {
	app.use('/preview', require('./preview_controller.js'));
	app.use('/shout', require('./shout_controller.js'));
	app.use('/proxy', require('./proxy_controller.js'));
}
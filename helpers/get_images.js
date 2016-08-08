var googleImages = require('google-images');
var client = googleImages('004462654191392209191:2ld2qd1m6r4', 'AIzaSyC8T94VqOmP24H2Xt9dyVjcGEbsp_7sp5M');

module.exports = function (query, callback) {
	// client.search(query, {size: 'medium'}).then(
	// 	function(data){
	// 		callback(null, data);
	// 	},
	// 	function(error){
	// 		callback(error);
	// 	}
	// );
	var data = require(process.cwd() + '/fixtures/mock_data3.js');
	callback(null, data);
}
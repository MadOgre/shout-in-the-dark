module.exports = function (query, callback) {
	//code to retrieve images will go here

	//send mock data instead (delete this line later)
	var data = require(process.cwd() + '/fixtures/mock_data3.js');

	callback(null, data);
}
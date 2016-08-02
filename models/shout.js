var mongoose = require("mongoose");

var ShoutSchema = new mongoose.Schema({
	bodyText: String,
	imagePath: String
});

var Shout = mongoose.model("Shout", ShoutSchema);

module.exports = Shout;
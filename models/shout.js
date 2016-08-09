var mongoose = require("mongoose");

var ShoutSchema = new mongoose.Schema({
	bodyText: String,
	imagePath: String,
	createdAt: Date
});

var Shout = mongoose.model("Shout", ShoutSchema);

module.exports = Shout;
var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
   title: String,
   description: String,
});

module.exports = mongoose.model ("Challenge", challengeSchema);
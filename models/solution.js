var mongoose = require('mongoose');

var solutionSchema = new mongoose.Schema({
    solutionTitle: String,
    solutionText: String
});

module.exports = mongoose.model ("Solution", solutionSchema);
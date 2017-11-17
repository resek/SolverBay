var mongoose = require('mongoose');

var solutionSchema = new mongoose.Schema({
    solutionTitle: String,
    solutionText: String,
    author: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String
     }
});

module.exports = mongoose.model ("Solution", solutionSchema);
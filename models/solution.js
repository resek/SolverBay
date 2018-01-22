var mongoose = require('mongoose');

var solutionSchema = new mongoose.Schema({
    solutionTitle: String,
    solutionText: String,
    cooperationCheck: { type: Boolean, default: false },
    files: Array,
    author: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String,
        email: String
     }
});

module.exports = mongoose.model ("Solution", solutionSchema);
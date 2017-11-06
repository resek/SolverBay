var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    prize: Number,
    date: String,
    solutions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solution",
        }
    ],
});

module.exports = mongoose.model ("Challenge", challengeSchema);
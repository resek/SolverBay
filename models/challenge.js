var mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
    title: String,
    field: String,
    description: String,
    prize: Number,
    currency: String,
    date: String,
    isPaid: { type: Boolean, default: false },
    solutions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solution",
        }
    ],
    author: {
        id: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String
     }
});

module.exports = mongoose.model ("Challenge", challengeSchema);
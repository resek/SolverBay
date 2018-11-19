var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var challengeSchema = new mongoose.Schema({
    title: String,
    field: String,
    description: String,
    prize: Number,
    currency: String,
    date: String,
    isPaid: { type: Boolean, default: false },
    files: Array,
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
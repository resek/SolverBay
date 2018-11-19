var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
});

module.exports = mongoose.model ("Token", tokenSchema);
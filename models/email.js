var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var emailSchema = new mongoose.Schema({
    email: String
});

module.exports = mongoose.model ("Email", emailSchema);
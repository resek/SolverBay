var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
    email: String
});

module.exports = mongoose.model ("Email", emailSchema);
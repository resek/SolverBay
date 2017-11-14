var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    //nickname: String,
    email: String,
    password: String,
    //isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model ("User", UserSchema);
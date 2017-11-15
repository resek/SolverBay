var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});


UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists!' });

module.exports = mongoose.model ("User", UserSchema);
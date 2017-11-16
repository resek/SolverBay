var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
});

UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

module.exports = mongoose.model ("User", UserSchema);
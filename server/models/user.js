const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const crypto = require('crypto');
const secret = require('../config/main').secret;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  hash: String,
  salt: String,
});

UserSchema.plugin(mongooseUnique, {message: 'is already taken.'});

UserSchema.methods.hashPassword = function hashPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

module.exports =  mongoose.model('User', UserSchema);
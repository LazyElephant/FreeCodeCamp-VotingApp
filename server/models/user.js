const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.pre('save', function preSave(next) {
  if (this.isModified('password') || this.isNew) {
    this.sePassword(password);
  }
  next();
});

module.exports =  mongoose.model('User', UserSchema);
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const {secret} = require('./main');

module.exports = function configPassport(passport) {
  addLocalStrategy(passport);
  addJwtStrategy(passport);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    const {username} = user;
    User.findOne({username}, function(err, user) {
      done(err, user);
    });
  });
}

function addLocalStrategy(passport) {
  passport.use(new LocalStrategy(function localAuth(username, password, done) {
    User.findOne({username}, function(err, user) {
      if (err) { return done(err, false); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }

      return done(null, user);
    });
  }));
}

function addJwtStrategy(passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };

  passport.use(new JwtStrategy(opts, function jwtAuth(payload, done) {
    User.findOne({id: payload.id}, function(err, user) {    
      if (err) { return done(err, false); }
      if (!user) { return done(null, false); }
      else { return done(null, user); }
    });
  }));
}
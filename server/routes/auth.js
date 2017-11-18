const passport = require('passport');
const User = require('../models/user');
const {secret} = require('../config/main');
const {checkAuthentication} = require('./route-utils');

module.exports = function addAuthRoutes(router) {
  addLogin(router);
  addLogout(router);
  addRegister(router);
}

function addLogin(router) {
  router.post('/login', function login(req, res, next) {
    // TODO: validate username/password
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.status(401).json({message: "log in failed"});
      
      req.login(user, function(err) {
        if (err) return next(err);

        res.status(200).json({
          message:"Logged in",
          username: user.username,
        });
      });
    })(req, res, next);
  });
}

function addRegister(router) {
  router.post('/register', function register(req, res, next) {
    // TODO: validate username/password
    const user = new User();
    user.username = req.body.username;
    user.hashPassword(req.body.password);
  
    user.save(function(err, user) {
      if (err) return next(err);
      
      req.login(user, function(err) {
        if (err) return next(err);

        res.status(200).json({
          message:"User created successfully",
          username: user.username,
        });
      });
    });
  });
}

function addLogout(router) {
  router.get('/logout', function logout(req, res, next) {
    req.logout();
    res.status(200).json({message: "Logged out"});
  });
}
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/main');

module.exports = function addAuthRoutes(router) {
  addLogin(router);
  addLogout(router);
  addRegister(router);
}

function generateJwt(username) {
  return jwt.sign(username, secret);
}

function addLogin(router) {
  router.post('/login', function login(req, res, next) {
    // TODO: validate username/password
    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) return res.json({success: false, message: "No user with that name exists"});
      
      req.login(user, function(err) {
        if (err) return next(err);

        res.json({
          success: true, 
          message:"Logged in",
          username: user.username,
          token: generateJwt(user.username),
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

        res.json({
          success: true, 
          message:"User created successfully",
          username: user.username,
          token: generateJwt(user.username),
        });
      });
    });
  });
}

function addLogout(router) {
  router.get('/logout', function logout(req, res, next) {
    console.log(req.session);
    if (!req.user) return res.json({success:false, message:"You must be logged in to log out"});
    req.logout();
    delete req.session;
    res.json({success: true, message: "Logged out"});
  });
}
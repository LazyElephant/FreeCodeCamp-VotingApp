const passport = require('passport');
const User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200)
  res.json({success: true, message: "nothing to see here"})
});

router.post('/login', function login(req, res, next) {
  // TODO: validate username/password
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.json({success: false, message: "No user with that name exists"});
    
    res.json({success: true, message:"Logged in"});
  })(req, res, next);
});

router.post('/register', function register(req, res, next) {
  // TODO: validate username/password
  const user = new User();
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, user) {
    if (err) return next(err);

    res.json({
      success: true, 
      message:"User created successfully",
    });

  });
});

module.exports = router;

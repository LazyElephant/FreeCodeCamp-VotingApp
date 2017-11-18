const express = require('express');
const router = express.Router();
const addAuthRoutes = require('./auth');
const addPollRoutes = require('./poll');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200)
  res.json({success: true, message: "nothing to see here"})
});

addAuthRoutes(router);
addPollRoutes(router);

module.exports = router;

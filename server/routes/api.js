var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200)
  res.json({message: "nothing to see here"})
});

module.exports = router;

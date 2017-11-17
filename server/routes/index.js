var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile("index.html");
});

router.get('/api/test', function(req, res, next) {
  res.json({message: "yep, you hit the endpoint"})
})
module.exports = router;

const Poll = require('../models/poll');
const passport = require('passport');

module.exports = function addPollRoutes(router) {
  indexRoute(router);
  singlePollRoute(router);
  deleteRoute(router);
  createRoute(router);
  updateRoute(router);
}

function indexRoute(router) {
  router.get('/polls', function pollsIndex(req, res, next) {
    Poll.find({}, function(err, polls) {
      if (err) return next(err);

      res.json(200, {polls})
    });
  });
}

function singlePollRoute(router) {
  router.get('/polls/:id', function pollById(req, res, next) {
    Poll.findOne({_id: req.params.id}, function(err, poll) {
      if (err) return next(err);
      if (!poll) return res.status(404).json({message: "Poll not found"});
      res.status(200).json({poll});
    });
  });
}

function updateRoute(router) {
  router.put('/polls/:id', function updatePoll(req, res, next) {
    Poll.findOne({_id: req.params.id}, function(err, poll) {
      if (err) return next(err);
      if (!poll) return res.status(400).json({message: "Bad Request"});
      
      // TODO: check that poll hasn't been modified by this ip/user
      const userVoted = (req.user && poll.uservotes.indexOf(req.user.username) !== -1)
      if (userVoted) return res.status(400).json({message: "Each user can only vote once"});

      // const ipVoted = (poll.ipvotes.indexOf(req.ip) !== -1)
      // TODO: validate option parameter
      const opt = req.body.option;
      if (poll.options.hasOwnProperty(opt)) {
        poll.options[opt]++;
      } else {
        poll.options[opt] = 1;
      }
      poll.uservotes.push(req.user.username);
      poll.save(function(err, poll) {
        if (err) return next(err);

        res.status(200).json({message: "Saved successfully", poll});
      });
    })
  });
}

function deleteRoute(router) {
  router.delete('/polls/:id', 
    passport.authenticate('jwt'), 
    function deletePoll(req, res, next) 
    {
      Poll.remove({_id: req.params.id, owner: req.user.username}, function(err, info) {
        if (err) return next(err);

        const recordFound = info && info.result && info.result.n && info.result.n !== 0;
        if (!recordFound) return res.status(404).json({message: "Not Found"});

        res.status(200).json({message: "Poll deleted"});
      });
  });
}

function createRoute(router) {
  router.post('/polls/create', 
    passport.authenticate('jwt'), 
    function createPoll(req, res, next) {
      // TODO: validate poll data
      const {title, options} = req.body;
      const opts = {};
      options.forEach(o => opts[o] = 0);
      const owner = req.user.username;
      const poll = new Poll({
        owner,
        title,
        options: opts,
        uservotes: []
      });

      poll.save(function(err, poll) {
        if (err) return next(err);
        res.status(200).json({message: "Poll created successfully", poll});
      });
  });
}

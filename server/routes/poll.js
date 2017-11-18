const Poll = require('../models/poll');
const passport = require('passport');

module.exports = function addPollRoutes(router) {
  indexRoute(router);
  singlePollRoute(router);
  deleteRoute(router);
  createRoute(router);
  // updateRoute(router);
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

function deleteRoute(router) {
  router.delete('/polls/:id', function deletePoll(req, res, next) {
    // TODO: authenticate with jwt and verify user matches poll owner
    Poll.remove({_id: req.params.id}, function(err) {
      if (err) return next(err);

      res.status(200).json({message: "Poll deleted"});
    })
  });
}

function createRoute(router) {
  router.post('/polls/create', function createPoll(req, res, next) {
    // TODO: authenticate with jwt
    // TODO: validate poll data
    const {title, options} = req.body;
    const owner = req.user.username;
    const poll = new Poll({
      owner,
      title,
      options,
    });

    poll.save(function(err, poll) {
      if (err) return next(err);
      res.status(200).json({message: "Poll created successfully", poll});
    });
  });
}

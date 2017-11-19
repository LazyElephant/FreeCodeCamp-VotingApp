const Poll = require('../models/poll');
const passport = require('passport');
const {checkAuthentication} = require('./route-utils');

module.exports = function addPollRoutes(router) {
  indexRoute(router);
  singlePollRoute(router);
  deleteRoute(router);
  createRoute(router);
  updateRoute(router);
  myPolls(router);
}

function indexRoute(router) {
  router.get('/polls', function pollsIndex(req, res, next) {
    Poll.find({}, function(err, polls) {
      if (err) 
        return next(err);

      res.status(200).json({polls})
    });
  });
}

function singlePollRoute(router) {
  router.get('/polls/:id', function pollById(req, res, next) {
    Poll.findOne({_id: req.params.id}, function(err, poll) {
      if (err) 
        return next(err);
      if (!poll) 
        return res.status(404).json({message: "Not found"});
      res.status(200).json({poll});
    });
  });
}

function updateRoute(router) {
  router.put('/polls/:id', function updatePoll(req, res, next) {
    Poll.findOne({_id: req.params.id}, function(err, poll) {
      if (err) 
        return next(err);
      if (!poll) 
        return res.status(400).json({message: "Bad Request"});
      
      const userVoted = (req.user && poll.uservotes.indexOf(req.user.username) !== -1)
      if (userVoted) 
        return res.status(400).json({message: "Each user can only vote once"});

      const ipVoted = (poll.ipvotes.indexOf(req.ip) !== -1)
      if (ipVoted && !req.user) 
        return res.status(400).json({message: "Unauthenticated users can only vote once per ip"})
      
      const opt = req.body.option;
      if (poll.options.hasOwnProperty(opt)) {
        poll.options[opt]++;
      } else if (req.user) {
        // sanitize new opt
        poll.options[opt] = 1;
      } else {
        return res.status(401).json({message: "Unauthenticated users can't add new options"});
      }
      req.user ? poll.uservotes.push(req.user.username) : poll.ipvotes.push(req.ip);
      poll.save(function(err, poll) {
        if (err) return next(err);

        res.status(200).json({message: "Update successful", poll});
      });
    })
  });
}

function deleteRoute(router) {
  router.delete('/polls/:id', 
    checkAuthentication,  
    function deletePoll(req, res, next) 
    {
      Poll.remove({_id: req.params.id, owner: req.user.username}, function(err, info) {
        if (err) 
          return next(err);

        const recordFound = info && info.result && info.result.n && info.result.n !== 0;
        if (!recordFound) 
          return res.status(404).json({message: "Not Found"});

        res.status(200).json({message: "Poll deleted"});
      });
  });
}

function createRoute(router) {
  router.post('/polls/create', 
    checkAuthentication,
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
        uservotes: [],
        ipvotes: []
      });

      poll.save(function(err, poll) {
        if (err) 
          return next(err);
    
        res.status(200).json({message: "Poll created successfully", poll});
      });
  });
}

function myPolls(router) {
  router.get('/api/mypolls', checkAuthentication, function myPolls(req, res, next) {
    Poll.find({owner: req.user.username}, function(err, polls) {
      if (err)
        return next(err);
      
        res.status(200).json({polls});
    });
  });
}
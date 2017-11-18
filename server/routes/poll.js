const Poll = require('../models/poll');
const passport = require('passport');

module.exports = function addPollRoutes(router) {
  indexRoute(router);
}

function indexRoute(router) {
  router.get('polls', function pollsIndex(req, res, next) {
    // TODO: get data from db and send as json
    res.json(200, {success: true, polls: ["here's one", "here's another"]})
  });
}

function singlePollRoute(router) {
  router.get('polls/:id', function pollById(req, res, next) {
    // TODO: get poll by id from db
  });
}

function deleteRoute(router) {
  router.delete('polls/:id', function deletePoll(req, res, next) {
    // TODO: authenticate with jwt and verify user matches poll owner
  });
}

function createRoute(router) {
  router.post('polls/create', function createPoll(req, res, next) {
    // TODO: authenticate with jwt
  });
}

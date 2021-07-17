const router = require('express').Router();
const chordGroupController = require('../controllers/chordGroupController');
const checkAuth = require('../middleware/checkAuth');

module.exports = () => {
  router.get('/curr', checkAuth, chordGroupController.curr);

  return router;
}
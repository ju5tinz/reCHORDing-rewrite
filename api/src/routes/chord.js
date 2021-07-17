const router = require('express').Router();
const chordController = require('../controllers/chordController');
const checkAuth = require('../middleware/checkAuth');
const checkGroup = require('../middleware/checkGroup');

module.exports = () => {
  router.post('/', checkAuth, checkGroup, chordController.add);
  router.get('/', checkAuth, checkGroup, chordController.get);

  return router;
}
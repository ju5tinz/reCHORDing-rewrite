const router = require('express').Router();
const userController = require('../controllers/userController');

module.exports = () => {
  router.post('/register', userController.register);
  router.post('/login', userController.login);
  router.post('/logout', userController.logout);

  return router;
}
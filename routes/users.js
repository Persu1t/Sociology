const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controllers');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signup);
router.get('/login', usersController.login)

router.post('/create', usersController.create);

// use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/users/login'},
) ,usersController.createSession);

router.get('/sign-out', usersController.destroySession);
module.exports = router;
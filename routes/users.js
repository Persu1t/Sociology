const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controllers');

router.get('/profile', usersController.profile);
router.get('/sign-up', usersController.signup);

router.post('/create', usersController.create);
module.exports = router;
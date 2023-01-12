const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login_controller')

console.log('loaded routes')

router.get('/', loginController.login);
router.use('/users', require('./home'))
router.use('/users', require('./users'))
router.use('/users', require('./posts'))

module.exports = router;

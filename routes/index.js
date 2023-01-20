const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

console.log('loaded routes')

router.get('/', homeController.home);
// router.use('/users', require('./home'))
router.use('/users', require('./users'))
router.use('/posts', require('./posts'))
router.use('/comments', require('./comments'))

module.exports = router;

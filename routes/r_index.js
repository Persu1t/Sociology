const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('loaded routes')

router.get('/', homeController.home);


module.exports = router;
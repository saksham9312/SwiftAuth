const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
console.log('router exported!');

router.get('/', homeController.home);
router.use('/client', require('./client'));
// router.use('/post', require('./post'));
// router.use('/comment', require('./comment'));
// router.use('/api', require('./api'));
module.exports = router;
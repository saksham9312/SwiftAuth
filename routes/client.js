const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clients_controller');
const passport = require('passport');

router.post('/create', clientController.create);
router.get('/signup', clientController.signup);
router.get('/verify/:token',clientController.emailVerify);
// router.use('/post', require('./post'));
// router.use('/comment', require('./comment'));
// router.use('/api', require('./api'));
module.exports = router;
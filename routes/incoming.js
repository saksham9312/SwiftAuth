const express = require('express');
const router = express.Router();
const incomingController = require('../controllers/incoming_controller');
const passport = require('passport');

router.post('/phone', incomingController.checkClient);
// router.get('/email', clientController.signup);
// router.get('/verify/:token',clientController.emailVerify);
module.exports = router;
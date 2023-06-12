const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clients_controller');
const passport = require('passport');

router.post('/create', clientController.create);
router.get('/signup', clientController.signup);
router.get('/signin', clientController.signin);
//failure redirect url
router.get('/dashboard/setup/:token', clientController.dashboardSetup);
router.get('/dashboard/history/', clientController.dashboardHistory);
router.get('/verify/:token',clientController.emailVerify);
router.get('/email-sent',clientController.emailSent);
module.exports = router;
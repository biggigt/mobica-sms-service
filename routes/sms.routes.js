const Router = require('express');
const smsController = require('../controller/sms.controller');
const router = new Router();

router.get('/checkStatus', smsController.checkSmsStatus);
router.get('/deliveryReport', smsController.deliveryReport);
router.post('/send', smsController.sendSms);
router.get('/balance', smsController.checkBalance);


module.exports = router
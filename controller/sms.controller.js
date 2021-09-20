const axios = require('axios');
const { stat } = require('fs-extra');
const SMS = require('../model/sms.model');

class SmsController {

  async checkBalance(req,res){
    const {user,pass} = req.body;
    const url = `https://gate.mobica.bg/check_money.php?user=${user}&pass=${pass}`;
    await axios
    .post(url, '')
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      console.log(response);
      res.json(response.data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
  }

  async checkSmsStatus(req,res){
    const {user,pass,phone,message,from,route} = req.body;
    const url = `https://gate.mobica.bg/send.php?user=${user}&pass=${pass}&phone=${phone}&message=${message}&from=${from}&route=${route}`;
    // const response = this.sendPackage(url,'');
    // res.status(response.status).json(response.statusDescription);
    await axios
    .post(url, '')
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      res.status(200).json(response.data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
  }

  async deliveryReport(req,res) {
    const {user,pass,idd} = req.body;
    const url = `https://gate.mobica.bg/checkDLR.php?user=${user}&pass=${pass}&idd=${idd}`;
    // const response = await this.sendPackage(url,'');
    // res.status(response.status).json(response.statusDescription);
    await axios
    .post(url, '')
    .then(response => {
      // console.log(`statusCode: ${response.status}`);
      // console.log(response);
      res.status(200).json(response.data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
  }

  async sendSms(req,res) {
    const { user,pass,phone, message, from, route, idd, smartCut, priority, toDate} = req.body;
    const phoneN = [phone];
    const smsData = new SMS(message,from,route,idd,smartCut,priority,toDate);
    
    const data = {
      user: user,
      pass: pass,
      phone: phoneN,
      sms: smsData
    };
    // res.status(200).json(data);
    // const response = await this.sendPackage('https://gate.mobica.bg/send.php', data);
    await axios
    .post('https://gate.mobica.bg/send.php', data)
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      res.status(200).json(response.data);
    })
    .catch(err => {
        res.status(400).json(err);
    });
    // res.status(response.status).json(response.statusDescription);
  }
  async sendPackage(url, data){
    await axios
    .post(url, data)
    .then(response => {
      console.log('sms wrapped and sent');
      console.log(`statusCode: ${response.status}`);
      console.log(response);
      return this.responseCodeMobica(response.status);
    })
    .catch(err => {
      return err;
    });
  }
  responseCodeMobica(status){
    const resp = {status: '', statusDescription: ''};
    switch(status){
      case '1000':
        resp.status = '200';
        resp.statusDescription = 'SMS is delivered';
        return resp;
      case '1004':
        resp.status = '200';
        resp.statusDescription = 'Successfully accepted request';
        return resp;
      case '1006':
        resp.status = '404';
        resp.statusDescription = 'Invalid Phone Number';
        return resp;
      case '1007':
        resp.status = '400';
        resp.statusDescription = 'Invalid schedule data';
        return resp;
      case '1008':
        resp.status = '400';
        resp.statusDescription = 'Invalid Request Format';
        return resp;
      case '1115':
        resp.status = '401';
        resp.statusDescription = 'Invalid username or password';
        return resp;
      case '1117':
        resp.status = '405';
        resp.statusDescription = 'Money in your account have ran out';
        return resp;
      case '1120':
        resp.status = '406';
        resp.statusDescription = 'No value for obligatory field is set';
        return resp;
      case '1121':
        resp.status = '403';
        resp.statusDescription = 'Request sent from unauthorized IP address';
        return resp;
      case '1122':
        resp.status = '405';
        resp.statusDescription = 'Account is not active';
        return resp;
      default:
        resp.status = '200';
        resp.statusDescription = status;
        return resp;
    }
  }
}

module.exports = new SmsController();

const express = require('express');
const router = express.Router();
// var app = require('wm-is-client');
const config = require('config');
const integrationServer = config.get('integrationServer');
var expressJWT = require('express-jwt');

const path = 'http://'.concat(integrationServer.host.concat(':'.concat(integrationServer.port.concat(integrationServer.example))));
const api = config.get('api'); // added

const controller = require("nodejs-baseline").controller;

router.use(expressJWT({ secret: new Buffer(api.token_secret, 'base64'), audience: api.token_audience })); 


router.put('/',  (req, res) => {
  const body = JSON.stringify(req.body);
  controller.pilot('PUT', `${path}clients`, req, res , body );
});

router.get('/balance/:name', (req, res) => {
  const name = encodeURI(req.params.name);
  controller.pilot('GET', `${path}balance/${name}`, req, res);
});

router.get('/',  (req, res) => {
  controller.pilot('GET', `${path}clients`, req, res);
});

router.post('/moneyDeposit',  (req, res) => {
  const body = JSON.stringify(req.body);
  controller.pilot('POST', `http://${path}moneyDeposit`, req, res , body );
});

router.post('/moneyTransfer',  (req, res) => {
  const body = JSON.stringify(req.body);
  controller.pilot('POST', `http://${path}moneyTransfer`, req, res , body );
});

router.post('/moneyWithdrawl',  (req, res) => {
  const body = JSON.stringify(req.body);
  controller.pilot('POST', `http://${path}moneyWithdrawl`, req, res , body );
});

router.delete('/:name',  (req, res) => {
  console.log(`${path}clients/${req.params.name}`);
  controller.pilot('DELETE', `${path}clients/${req.params.name}`, req, res);
});

router.get('/actions',  (req, res) => {
  controller.pilot('GET', `${path}actions`, req, res);
});



module.exports = router;



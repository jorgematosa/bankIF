
const express = require('express');
const clients = require('./routes/clients');
const config = require('config');
const api = config.get('api');

module.exports = function(app) {
  app.use(express.json());
  app.use(api.api_url + 'clients', clients);
}

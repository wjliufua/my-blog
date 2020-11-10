const express = require('express');
const client = express.Router();

client.get('/', require('./client/index'));

module.exports = client;
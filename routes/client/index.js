const express = require('express');
const client = express.Router();

client.get('/email', require('../nodemailer'));

module.exports = client;
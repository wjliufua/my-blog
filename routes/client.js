const express = require('express');
const client = express.Router();

client.get('/', require('./nodemailer'));

module.exports = client;
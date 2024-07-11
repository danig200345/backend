// routes/index.js
const express = require('express');
const app = express();

let envio = require('../Controllers/correoController');

app.post('/envio', envio.enviarCorreo);

module.exports = app;



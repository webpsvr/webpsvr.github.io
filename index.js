'use strict';

const path = require('path');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use("/client", express.static(path.join(__dirname, 'client')));
app.use("/lib", express.static(path.join(__dirname, 'lib')));
app.use("/stylesheets", express.static(path.join(__dirname, 'stylesheets')));
app.listen(3333);
console.log('listening on port 3333');

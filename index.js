'use strict';

const path = require('path');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use("/js", express.static(path.join(__dirname, 'js')));
app.use("/instruction", express.static(path.join(__dirname, 'instruction')));
app.use("/lib", express.static(path.join(__dirname, 'lib')));
app.use("/stylesheets", express.static(path.join(__dirname, 'stylesheets')));
app.use("/assets", express.static(path.join(__dirname, 'assets')));
app.use("/examples", express.static(path.join(__dirname, 'examples')));
app.listen(3333);
console.log('listening on port 3333');

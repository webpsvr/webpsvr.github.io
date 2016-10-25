"use strict";

const path = require("path");

const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.listen(3333);
console.log("listening on port 3333");

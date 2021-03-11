"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { routes, errors } = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(errors());

module.exports = app;

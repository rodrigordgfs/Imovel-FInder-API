"use strict";

require("dotenv").config();

const express = require("express");

const app = express();

require("./redis/blacklist");

const { routes, errors } = require("./routes");
const { AuthenticationStrategy, AuthorizationStrategy } = require("./Services");

const AlreadyExists = require("./errors/AlreadyExists");
const NotFound = require("./errors/NotFound");
const Deativated = require("./errors/Deactivated");
const InvalidArgument = require("./errors/InvalidArgument");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errors());

app.use((error, req, res, next) => {
  if (error instanceof AlreadyExists) {
    res.status(409);
  } else if (error instanceof NotFound || error instanceof InvalidArgument) {
    res.status(404);
  } else if (error instanceof Deativated) {
    res.status(400);
  } else {
    res.status(400);
  }
  res.send({ message: error.message });
});

module.exports = app;

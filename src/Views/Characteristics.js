"use strict";

const Characteristics = require("../models/Characteristics");

module.exports = {
  async post(body) {
    return await Characteristics.create(body);
  },
};

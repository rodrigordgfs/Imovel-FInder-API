"use strict";

const Characteristics = require("../Views/Characteristics");

exports.post = async (req, res, next) => {
  try {
    let body = req.body;
    const result = await Characteristics.post(body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

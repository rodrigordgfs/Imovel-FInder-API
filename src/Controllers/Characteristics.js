"use strict";

const Characteristics = require("../Views/Characteristics");

exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const result = await Characteristics.create(body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await Characteristics.getAll();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Characteristics.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Characteristics.delete(id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Characteristics.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

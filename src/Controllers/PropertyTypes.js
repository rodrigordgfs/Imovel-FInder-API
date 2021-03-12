"use strict";

const PropertyTypes = require("../Views/PropertyTypes");

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    await PropertyTypes.checkIfExist(body.name);
    const result = await PropertyTypes.create(body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await PropertyTypes.getAll();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await PropertyTypes.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    await PropertyTypes.getByID(id);
    await PropertyTypes.delete(id);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await PropertyTypes.getByID(id);
    await PropertyTypes.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

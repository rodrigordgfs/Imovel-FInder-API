"use strict";

const Characteristics = require("../models/Characteristics");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

exports.create = async (body) => {
  await this.checkIfExist(body.name);
  return await Characteristics.create(body);
};

exports.getAll = async () => {
  return await Characteristics.findAll({
    where: { active: true },
    attributes: ["id", "name"],
  });
};

exports.checkIfExist = async (name) => {
  const result = await Characteristics.findOne({ where: { name: name } });
  if (result) {
    throw new AlreadyExists("Characteristic already exists.");
  }
};

exports.getByID = async (id) => {
  const result = await Characteristics.findByPk(id, {
    attributes: ["id", "name"],
  });
  if (!result) {
    throw new NotFound("Characteristic not found.");
  }
  return result;
};

exports.delete = async (id) => {
  await this.getByID(id);
  return await Characteristics.destroy({ where: { id } });
};

exports.update = async (id, body) => {
  await this.getByID(id);
  return await Characteristics.update(body, { where: { id } });
};

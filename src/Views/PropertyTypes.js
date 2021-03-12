"use strict";

const PropertyTypes = require("../models/PropertyTypes");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

exports.create = async (body) => {
  await this.checkIfExist(body.name);
  return await PropertyTypes.create(body);
};

exports.checkIfExist = async (name) => {
  const result = await PropertyTypes.findOne({ where: { name: name } });
  if (result) {
    throw new AlreadyExists("Property Type already exists.");
  }
};

exports.getAll = async () => {
  return await PropertyTypes.findAll({
    where: { active: true },
    attributes: ["id", "name", "icon"],
  });
};

exports.getByID = async (id) => {
  const result = await PropertyTypes.findByPk(id, {
    attributes: ["id", "name", "icon"],
  });
  if (!result) {
    throw new NotFound("Property Type not found.");
  }
  return result;
};

exports.delete = async (id) => {
  await this.getByID(id);
  return await PropertyTypes.destroy({ where: { id } });
};

exports.update = async (id, body) => {
  await this.getByID(id);
  return await PropertyTypes.update(body, { where: { id } });
};

"use strict";

const PropertyTypes = require("../models/PropertyTypes");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

module.exports = {
  async checkIfExist(name) {
    const result = await PropertyTypes.findOne({ where: { name: name } });
    if (result) {
      throw new AlreadyExists("Property Type already exists.");
    }
  },

  async create(body) {
    return await PropertyTypes.create(body);
  },

  async getAll() {
    return await PropertyTypes.findAll({
      where: { active: true },
      attributes: ["id", "name", "icon"],
    });
  },

  async getByID(id) {
    const result = await PropertyTypes.findByPk(id, {
      attributes: ["id", "name", "icon"],
    });
    if (!result) {
      throw new NotFound("Property Type not found.");
    }
    return result;
  },

  async delete(id) {
    return await PropertyTypes.destroy({ where: { id } });
  },

  async update(id, body) {
    return await PropertyTypes.update(body, { where: { id } });
  },
};

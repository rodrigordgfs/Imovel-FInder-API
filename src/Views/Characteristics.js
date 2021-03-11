"use strict";

const Characteristics = require("../models/Characteristics");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

module.exports = {
  async post(body) {
    return await Characteristics.create(body);
  },

  async checkIfExist(name) {
    const result = Characteristics.findOne({ where: { name: name } });
    if (result) {
      throw new AlreadyExists("Characteristic already exists.");
    }
  },

  async getAll() {
    return await Characteristics.findAll({
      where: { active: true },
      attributes: ["id", "name"],
    });
  },

  async getByID(id) {
    const result = await Characteristics.findByPk(id, {
      attributes: ["id", "name"],
    });
    if (!result) {
      throw new NotFound("Characteristic not found.");
    }
    return result;
  },

  async delete(id) {
    return await Characteristics.destroy({ where: { id } });
  },

  async update(id, body) {
    return await Characteristics.update(body, { where: { id } });
  },
};

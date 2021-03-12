const Users = require("../models/Users");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

exports.create = async (body) => {
  await this.checkIfExists(body.email);
  return await Users.create(body);
};

exports.update = async (id, body) => {
  await this.getByID(id);
  return await Users.update(body, { where: { id } });
};

exports.checkIfExists = async (email) => {
  const result = await Users.findOne({ where: { email } });
  if (result) {
    throw new AlreadyExists("User with this email already exists.");
  }
};

exports.getByID = async (id) => {
  const result = await Users.findByPk(id, {
    attributes: ["id", "email", "full_name"],
  });
  if (!result) {
    throw new NotFound("User not found.");
  }
  return result;
};

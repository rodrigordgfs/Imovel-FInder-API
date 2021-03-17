const Users = require("../models/Users");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

const bcrypt = require("bcrypt");
const apiConfig = require("../config/api");

function generateHashPassword(password) {
  const coustHash = apiConfig.coustHAsh;
  return bcrypt.hash(password, coustHash);
}

exports.create = async (body) => {
  const password = body.password;
  body.password = await generateHashPassword(password);
  await this.checkIfExists(body.email);
  const result = await Users.create(body);
  delete result.dataValues.password;
  return result;
};

exports.update = async (id, body) => {
  if (body.password) {
    const password = body.password;
    body.password = await generateHashPassword(password);
  }
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

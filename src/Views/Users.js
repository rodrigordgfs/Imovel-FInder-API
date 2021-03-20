const Users = require("../models/Users");
const AlreadyExists = require("../errors/AlreadyExists");
const NotFound = require("../errors/NotFound");

const bcrypt = require("bcrypt");

function generateHashPassword(password) {
  const coustHash = Number(process.env.COUST_HASH);
  return bcrypt.hash(password, coustHash);
}

exports.create = async (body) => {
  const password = body.password;
  body.password_hash = await generateHashPassword(password);
  delete body.password;
  await this.checkIfExists(body.email);
  const result = await Users.create(body);
  delete result.dataValues.password_hash;
  return result;
};

exports.update = async (id, body) => {
  if (body.password) {
    const password = body.password;
    delete body.password;
    body.password_hash = await generateHashPassword(password);
  }
  await this.getByID(id);
  return await Users.update(body, {where : {id}});
};

exports.checkIfExists = async (email) => {
  const result = await Users.findOne({where : {email}});
  if (result) {
    throw new AlreadyExists("User with this email already exists.");
  }
};

exports.getByID = async (id) => {
  const result = await Users.findByPk(id, {
    attributes : [ "id", "email", "full_name", "email_verified" ],
  });
  if (!result) {
    throw new NotFound("User not found.");
  }
  return result;
};

exports.verifyEmail = async (id, code) => {
  const user = await Users.findByPk(id, {
    attributes : [ "email_verified", "code_verification" ],
  });
  if (user.email_verified) {
    throw new AlreadyExists("Email already verified");
  } else if (Number(user.code_verification) !== Number(code)) {
    throw new AlreadyExists("Invalid verification code");
  }
  const body = {email_verified : true};
  return await Users.update(body, {where : {id}});
};

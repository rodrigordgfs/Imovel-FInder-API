const Users = require("../Views/Users");
const jwt = require("jsonwebtoken");

function generateTokenJWT(user) {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.CHAVE_JWT);
  return token;
}

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await Users.create(body);
    const token = generateTokenJWT(result.id);
    res.set("Authorization", token).status(201).send(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await Users.update(id, body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Users.getByID(id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const token = generateTokenJWT(req.user);
  res.set("Authorization", token).status(204).end();
};

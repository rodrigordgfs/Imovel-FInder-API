const Users = require("../Views/Users");
const jwt = require("jsonwebtoken");
const { EmailVerification } = require("../Services/Emails");

function generateTokenJWT(user) {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: "30d" });
  return token;
}

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const code = generateRandomCode();
    Object.assign({}, body, { code_verification: code });
    const result = await Users.create(body);
    const token = generateTokenJWT(result.id);
    const email = new EmailVerification(result);
    email.sendEmail().catch(console.log);
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
  try {
    const token = generateTokenJWT(req.user);
    res.set("Authorization", token).status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

exports.updateVerifiedEmail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const code = req.body.code
    await Users.verifyEmail(id, code);
    res.status(200).send({ message: "Email verified succesfully!" });
  } catch (error) {
    next(error);
  }
};

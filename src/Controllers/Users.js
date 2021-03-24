const Users = require("../Views/Users");
const jwt = require("jsonwebtoken");
const { EmailVerification } = require("../Services/Emails");
const { SMSVerification } = require("../Services/SMS");

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

function verifyAccount(data) {
  switch (data.dataValues.verification_type) {
    case "phone":
      const sms = new SMSVerification(data);
      sms.sendSMS().catch(console.log());
      break;
    case "email":
      const email = new EmailVerification(data);
      email.sendEmail().catch(console.log);
      break;
  }
}

exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    const code = generateRandomCode();
    body = Object.assign({}, body, { code_verification: code });
    const result = await Users.create(body);
    const token = generateTokenJWT(result.id);
    verifyAccount(result);
    delete result.dataValues.code_verification;
    delete result.dataValues.verification_type;
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
    const code = req.body.code;
    await Users.verifyEmail(id, code);
    res.status(200).send({ message: "Email verified succesfully!" });
  } catch (error) {
    next(error);
  }
};

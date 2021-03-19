const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      const user = await Users.findByPk(payload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const blacklist = require("../redis/manipulatesBlacklist");
const { JsonWebTokenError } = require("jsonwebtoken");

async function verifyBlacklistToken(token) {
  const tokenBlacklist = await blacklist.existsToken(token);
  if (tokenBlacklist) {
    throw new JsonWebTokenError("Invalid token for logout");
  }
}

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await verifyBlacklistToken(token);
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      const user = await Users.findByPk(payload.id);
      done(null, user, { token: token });
    } catch (error) {
      done(error);
    }
  })
);

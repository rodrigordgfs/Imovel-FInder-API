const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const InvalidArgument = require("../errors/InvalidArgument");

function validateEmail(user) {
  if (!user) {
    throw new InvalidArgument("There is no user with this email.");
  }
}

async function validatePassword(passoword, passwordHash) {
  const validPassword = await bcrypt.compare(passoword, passwordHash);
  if (!validPassword) {
    throw new InvalidArgument("Invalid email or password.");
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({
          where: { email },
          attributes: ["id", "email", "password_hash"],
        });
        validateEmail(user);
        await validatePassword(password, user.password_hash);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

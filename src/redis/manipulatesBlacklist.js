const blacklist = require("./blacklist");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const { createHash } = require("crypto");

function generateHashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

module.exports = {
  add: async (token) => {
    const dateExpire = await jwt.decode(token).exp;
    const tokenHash = generateHashToken(token);
    await setAsync(tokenHash, "");
    blacklist.expireat(tokenHash, dateExpire);
  },

  existsToken: async (token) => {
    const tokenHash = generateHashToken(token);
    const result = await existsAsync(tokenHash);
    return result === 1;
  },
};

"use strict";

module.exports = {
  dialect: process.env.DIALECT_DB || "mysql",
  host: process.env.HOST_DB || "localhost",
  database: process.env.DATABASE_DB || "imovel-finder-api",
  username: process.env.USERNAME_DB || "root",
  password: process.env.PASSWORD_DB || "",
  define: {
    timestamp: true,
    underscored: true,
  },
  timezone: process.env.TIMEZONE_DB || "-3:00",
};

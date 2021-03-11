const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

const Characteristics = require("../models/Characteristics");

Characteristics.init(connection);

module.exports = connection;

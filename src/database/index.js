const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

const Characteristics = require("../models/Characteristics");
const PropertyTypes = require("../models/PropertyTypes");

Characteristics.init(connection);
PropertyTypes.init(connection);

module.exports = connection;

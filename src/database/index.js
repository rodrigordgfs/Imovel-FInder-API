const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

const Characteristics = require("../models/Characteristics");
const PropertyTypes = require("../models/PropertyTypes");
const Announcements = require("../models/Announcements");

Characteristics.init(connection);
PropertyTypes.init(connection);
Announcements.init(connection);

PropertyTypes.associate(connection.models);
Announcements.associate(connection.models);

module.exports = connection;

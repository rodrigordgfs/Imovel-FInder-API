"use strict";

const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const connection = new Sequelize(dbConfig);

const Characteristics = require("../models/Characteristics");
const PropertyTypes = require("../models/PropertyTypes");
const Announcements = require("../models/Announcements");
const AnnouncementPhotos = require("../models/AnnouncementPhotos");
const AnnouncementContact = require("../models/AnnouncementContacts");

Characteristics.init(connection);
PropertyTypes.init(connection);
Announcements.init(connection);
AnnouncementPhotos.init(connection);
AnnouncementContact.init(connection);

PropertyTypes.associate(connection.models);
Announcements.associate(connection.models);
Characteristics.associate(connection.models);
AnnouncementPhotos.associate(connection.models);
AnnouncementContact.associate(connection.models);

module.exports = connection;

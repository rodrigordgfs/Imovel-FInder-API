"use strict";
const { Model, DataTypes } = require("sequelize");

class AnnouncementContacts extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        has_whatsapp: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "announcement_contacts",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Announcements, {
      foreignKey: "announcement_id",
      as: "contact",
    });
  }
}

module.exports = AnnouncementContacts;

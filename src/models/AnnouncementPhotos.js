"use strict";
const { Model, DataTypes } = require("sequelize");

class AnnouncementPhotos extends Model {
  static init(sequelize) {
    super.init(
      {
        url: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "announcement_photos",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Announcements, {
      foreignKey: "announcement_id",
      as: "photos",
    });
  }
}

module.exports = AnnouncementPhotos;

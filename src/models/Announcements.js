"use strict";
const { Model, DataTypes } = require("sequelize");

class Announcements extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING(70),
        price: DataTypes.DECIMAL(8, 2),
        useful_area: DataTypes.INTEGER,
        gross_area: DataTypes.INTEGER,
        contruction_year: DataTypes.INTEGER,
        detailed_description: DataTypes.TEXT,
        zipcode: DataTypes.STRING(15),
        address: DataTypes.STRING(150),
        address_number: DataTypes.STRING(20),
        neighborhood: DataTypes.STRING(50),
        city: DataTypes.STRING(50),
        active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "announcements",
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.PropertyTypes, {
      foreignKey: "property_type_id",
      as: "property_type",
    });
    this.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsToMany(models.Characteristics, {
      foreignKey: "announcement_id",
      through: "announcements_characteristics",
      as: "characteristics",
    });
    this.hasMany(models.AnnouncementPhotos, {
      foreignKey: "announcement_id",
      as: "photos",
    });
    this.hasOne(models.AnnouncementContacts, {
      foreignKey: "announcement_id",
      as: "contact",
    });
  }
}

module.exports = Announcements;

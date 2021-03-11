"use strict";
const { Model, DataTypes } = require("sequelize");

class PropertyTypes extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        icon: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "propertytypes",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Announcements, {
      foreignKey: "property_type_id",
      as: "property_type",
    });
  }
}

module.exports = PropertyTypes;

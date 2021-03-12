"use strict";
const { Model, DataTypes } = require("sequelize");

class Characteristics extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "characteristics",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Announcements, {
      foreignKey: "characteristic_id",
      through: "announcements_characteristics",
      as: "announcements",
    });
  }
}

module.exports = Characteristics;

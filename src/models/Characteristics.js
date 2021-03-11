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
}

module.exports = Characteristics;

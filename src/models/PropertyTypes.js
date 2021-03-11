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
        tableName: "tb_property_types",
      }
    );
  }
}

module.exports = PropertyTypes;

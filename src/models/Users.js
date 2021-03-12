"use strict";
const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        email: DataTypes.STRING(100),
        password: DataTypes.STRING(50),
        full_name: DataTypes.STRING(100),
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Announcements, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

module.exports = Users;

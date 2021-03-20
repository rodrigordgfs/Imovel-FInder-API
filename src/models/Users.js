"use strict";
const {Model, DataTypes} = require("sequelize");

class Users extends Model {
  static init(sequelize) {
    super.init({
      email : DataTypes.STRING(100),
      password_hash : DataTypes.STRING,
      full_name : DataTypes.STRING(100),
      email_verified : DataTypes.BOOLEAN,
      code_verification : DataTypes.NUMBER,
    },
               {
                 sequelize,
                 tableName : "users",
               });
  }

  static associate(models) {
    this.hasMany(models.Announcements, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

module.exports = Users;

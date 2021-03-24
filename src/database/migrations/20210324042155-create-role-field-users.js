"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM("admin", "user"),
      defaultValue: "user",
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "role");
  },
};

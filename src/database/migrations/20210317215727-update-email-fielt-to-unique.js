"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("users", "email", {
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn("users", "email", {
      unique: false,
    });
  },
};

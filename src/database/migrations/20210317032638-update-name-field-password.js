"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn("users", "password", "password_hash");
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn("users", "password_hash", "password");
  },
};

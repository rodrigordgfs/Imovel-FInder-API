"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("announcements_characteristics", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      announcement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "announcements", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      characteristic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "characteristics", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("announcements_characteristics");
  },
};

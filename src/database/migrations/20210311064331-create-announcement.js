"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("announcements", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      property_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "propertytypes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      price: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      useful_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gross_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contruction_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      detailed_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      address_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("announcements");
  },
};

"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stats", {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        // primaryKey: true,
        autoIncrement: false,
        unique: true,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      length: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thickness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Stats");
  },
};

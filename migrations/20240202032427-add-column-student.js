"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("students", "email", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("students", "password", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("students", "email"),
      queryInterface.removeColumn("students", "password"),
    ]);
  },
};

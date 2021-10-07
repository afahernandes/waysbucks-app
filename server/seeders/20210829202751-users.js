"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullname: "Administrator",
          email: "admin@gmail.com",
          password: "$2b$10$d9jZ3wsdSezOecV2Hr9VUO88i3wtPv5gYNpUOxTbdcCT8.2CiWqOO",
          role: "Administrator",
          image: "Avatar.jpg",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

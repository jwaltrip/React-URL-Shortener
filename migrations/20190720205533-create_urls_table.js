'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable("urls", {
      id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      shortId: {
        type: Sequelize.STRING(10),
        unique: true,
        allowNull: false
      },
      originalUrl: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      shortUrl: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      clicksId: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      
      This is called on "sequelize migration:undo"

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable("urls");
  }
};

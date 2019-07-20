const Sequelize = require("sequelize")

module.exports = sequelize.define("url", {
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

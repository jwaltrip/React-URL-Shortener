const Sequelize = require("sequelize")

module.exports = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(300),
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  avatar: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

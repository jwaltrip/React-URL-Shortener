const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQL_DB_NAME || "",
  process.env.SQL_USER || "",
  process.env.SQL_PASS || "",
  {
    host: process.env.SQL_HOST || "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
);

module.exports = sequelize;
global.sequelize = sequelize;

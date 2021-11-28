require("dotenv").config();
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;



const { Sequelize } = require("sequelize");

module.exports = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: "mysql",
	host: "localhost",
});

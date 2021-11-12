const { Sequelize } = require('sequelize');

module.exports = new Sequelize("groupomania", "root", "", {
    dialect: "mysql",
    host: "localhost"
});
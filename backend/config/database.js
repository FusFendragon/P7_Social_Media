const { Sequelize } = require('sequelize');

module.exports = new Sequelize("groupomania", "fus", "0203", {
    dialect: "mysql",
    host: "localhost"
});
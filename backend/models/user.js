const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
   name: {
       type: Sequelize.STRING
    },
   email: {
        type: Sequelize.STRING
     },
   Password: {
      type: Sequelize.STRING
   },
   image: {
      type: Sequelize.STRING
   },
   bio: {
      type: Sequelize.STRING(350)
   }
});

module.exports = User;
const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
    authorId: {
       type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.STRING
     },
     usersLike: {
        type: Sequelize.STRING
     },
     message: {
        type: Sequelize.STRING
     }
});

module.exports = Post;
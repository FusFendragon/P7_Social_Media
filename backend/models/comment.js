const Sequelize = require("sequelize");
const db = require("../config/database");

const Comment = db.define("comment", {
	authorId: {
		type: Sequelize.STRING,
	},
	postId: {
		type: Sequelize.STRING,
	},
	message: {
		type: Sequelize.STRING(350),
	},
});

module.exports = Comment;

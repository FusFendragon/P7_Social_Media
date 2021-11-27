const Sequelize = require("sequelize");
const db = require("../config/database");

const Comment = db.define("comment", {
	message: {
		type: Sequelize.STRING(350),
	},
	imageUrl: {
		type: Sequelize.STRING,
	},
});

module.exports = Comment;

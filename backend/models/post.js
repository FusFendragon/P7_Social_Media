const Sequelize = require("sequelize");
const db = require("../config/database");

const Post = db.define("post", {
	authorId: {
		type: Sequelize.STRING,
	},
	message: {
		type: Sequelize.STRING(350),
	},
});

module.exports = Post;

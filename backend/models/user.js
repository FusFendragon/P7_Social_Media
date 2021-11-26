const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	name: {
		type: Sequelize.STRING(50),
	},
	email: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	imageUrl: {
		type: Sequelize.STRING,
	},
	bio: {
		type: Sequelize.STRING(350),
	},
	administrator: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	}
});

module.exports = User;

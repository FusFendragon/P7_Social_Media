const User = require("../models/user");
const db = require("../config/database");

exports.loginUser = (req, res, next) => {
	res.status(201).json({ message: "test" });
};

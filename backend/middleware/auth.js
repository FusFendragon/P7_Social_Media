const jwt = require("jsonwebtoken");

require("dotenv").config();
const tokenSecret = "SECRET_TOKEN";

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, tokenSecret);
		const userId = decodedToken.userId;
		console.log(userId);
		if (req.body.userId && req.body.userId !== userId) {
			res.status(401).json({
				message: "Invalid token!",
			});
		} else {
			req.userId = userId;
			next();
		}
	} catch {
		res.status(401).json({
			message: "Invalid token!",
		});
	}
};

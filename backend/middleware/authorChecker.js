const Post = require("../models/post");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const tokenSecret = "SECRET_TOKEN";

module.exports = (req, res, next) => {
	Post.findOne({
		id: req.params.id,
	}).then((post) => {
		console.log(post);
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, tokenSecret);
		const userId = decodedToken.userId;
		console.log(userId);
		if (post.userId !== userId) {
			return res.status(403).json({ message: "unauthorized request"});
		}
        next()
	})
	// .catch((error) => {
	// 	res.status(404).json({
	// 		error: error,
	// 	});
	// });
};

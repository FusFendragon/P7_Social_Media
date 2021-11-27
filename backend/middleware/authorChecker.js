const Post = require("../models/post");

require("dotenv").config();
const tokenSecret = "SECRET_TOKEN";

module.exports = (req, res, next) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((post) => {
			console.log(post.userId);
			if (post.userId !== req.userId) {
				return res.status(403).json({ message: "Vous n'êtes pas autorisé à faire cela" });
			}
			next();
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

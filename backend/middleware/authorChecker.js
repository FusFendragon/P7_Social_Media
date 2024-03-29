const Post = require("../models/post");
const User = require("../models/User");

module.exports = (req, res, next) => {
	User.findOne({
		where: {
			id: req.userId,
		},
	}).then((user) => {
		Post.findOne({
			where: {
				id: req.params.id,
			},
		})
			.then((post) => {
				console.log(post.userId);
				if (post.userId === req.userId || user.administrator === true) {
					next();
				} else {
					return res.status(403).json({ message: "Vous n'êtes pas autorisé à faire cela" });
				}
			})
			.catch((error) => {
				res.status(404).json({
					error: error,
				});
			});
	});
};

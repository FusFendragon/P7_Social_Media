const Comment = require("../models/comment");
const User = require("../models/User");

module.exports = (req, res, next) => {
	User.findOne({
		where: {
			id: req.userId,
		},
	}).then((user) => {
		Comment.findOne({
			where: {
				id: req.params.id,
			},
		})
			.then((post) => {
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

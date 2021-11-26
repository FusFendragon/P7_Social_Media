const Post = require("../models/post");

module.exports = (req, res, next) => {
	Post.findOne({
		id: req.params.id,
	}).then((post) => {
		if (post.userId !== req.userId) {
			return res.status(403).json({ message: "unauthorized request"});
		}
        next()
	})
	.catch((error) => {
		res.status(404).json({
			error: error,
		});
	});
};

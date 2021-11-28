const Post = require("../models/post");
const fs = require("fs");

// DELETE ALL IMAGE POST

module.exports = (req, res, next) => {
	Post.findAll({ where: { userId: req.params.id } })
		.then((post) => {
			post.forEach((post) => {
				if (post.imageUrl !== null) {
					const filename = post.imageUrl.split("/images/")[1];
					fs.unlink(`images/${filename}`, () => {
						next();
					});
				}
			});
			next();
		})
		.catch((error) => res.status(500).json({ error }));
};

const Comment = require("../models/Comment");
const fs = require("fs");

// DELETE ALL IMAGE COMMENT

module.exports = (req, res, next) => {
	Comment.findAll({ where: { userId: req.params.id } })
		.then((comment) => {
			comment.forEach((comment) => {
				if (comment.imageUrl !== null) {
					const filename = comment.imageUrl.split("/images/")[1];
					fs.unlink(`images/${filename}`, () => {
						next();
					});
				}
			});
			next();
		})
		.catch((error) => res.status(500).json({ error }));
};

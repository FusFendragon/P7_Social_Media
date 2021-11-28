const Comment = require("../models/comment");

// ADD POSTS
exports.createComment = (req, res, next) => {
	const imageOrNot = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null;
	console.log(req.userId);
	const data = {
		userId: req.userId,
		message: req.body.message,
		postId: req.body.postId,
		imageUrl: imageOrNot,
	};
	let { userId, message, postId, imageUrl } = data;
	if (!userId) {
		return res.status(401).json({ error: "Utilisateur non connecté" });
	}
	Comment.create({
		userId,
		message,
		postId,
		imageUrl,
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => res.status(400).json({ error }));
};

// GET COMMENTS FROM POST

exports.getComments = (req, res, next) => {
	const postId = req.params.id;
	Comment.findAll({ where: { postId: postId }, order: [["createdAt", "desc"]] })
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

// DELETE COMMENT

exports.deleteComment = (req, res, next) => {
	Comment.findOne({where: {id: req.params.id}})
		.then((comment) => {
			if (comment.imageUrl !== null) {
				console.log(comment.imageUrl);
				const filename = comment.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					Comment.destroy({where: {id: req.params.id}})
						.then(() => res.status(201).json({ message: "Comment with image Deleted  !" }))
						.catch((error) => res.status(400).json({ error }));
				});
			} else {
				Comment.destroy({where: {id: req.params.id}})
					.then(() => res.status(201).json({ message: "Comment Deleted !" }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

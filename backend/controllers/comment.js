const Comment = require("../models/comment");

// ADD POSTS
exports.createComment = (req, res, next) => {
	console.log(req.body.postId);
	const data = {
		userId: req.body.userId,
		message: req.body.message,
		postId: req.body.postId,
	};
	let { userId, message, postId } = data;
	if (!userId) {
		return res.status(401).json({ error: "Utilisateur non connecté" });
	}
	Comment.create({
		userId,
		message,
		postId,
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
	const commentId = req.params.id;
	Comment.destroy({
		where: {
			id: commentId,
		},
	})
		.then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
		.catch((error) => res.status(400).json({ error }));
};

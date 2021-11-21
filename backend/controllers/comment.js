const Comment = require("../models/comment");

// ADD COMMENTS
exports.createComment = (req, res, next) => {
	const data = {
		authorId: 2,
		postId: 1,
		message: "Ceci est le commentaire du post.",
	};
	let { authorId, postId, message } = data;

	Comment.create({
		authorId,
		postId,
		message,
	})
		.then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET COMMENTS FROM POST

exports.getComments = (req, res, next) => {
	const postId = req.params.id;
	console.log(postId);
	Comment.findAll({ where: { postId: postId } })
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

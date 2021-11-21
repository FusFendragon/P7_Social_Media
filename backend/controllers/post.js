const Post = require("../models/post");

// ADD POSTS
exports.createPost = (req, res, next) => {
	const data = {
		authorId: 3,
		message: "Maecenas vel porta lorem.",
	};
	let { authorId, message } = data;

	Post.create({
		authorId,
		message,
	})
		.then(() => res.status(201).json({ message: "Post ajouté !" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET ONE POST

exports.getOnePost = (req, res, next) => {
	const postId = req.params.id;
	console.log(postId);
	Post.findAll({ where: { id: postId } })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

// DELETE POST

exports.deletePost = (req, res, next) => {
	const postId = req.params.id;
	Post.destroy({
		where: {
			id: postId,
		},
	})
		.then(() => res.status(201).json({ message: "Post supprimé !" }))
		.catch((error) => res.status(400).json({ error }));
};

// GET ALL POSTS

exports.getAllPosts = (req, res) =>
	Post.findAll()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});

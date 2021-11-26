const Post = require("../models/post");

// ADD POSTS
exports.createPost = (req, res, next) => {
	const data = {
		userId: req.body.userId,
		message: req.body.message,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	};
	let { userId, message, imageUrl } = data;
	if (!userId) {
		return res.status(401).json({ error: "Utilisateur non connecté" });
	}
	Post.create({
		userId,
		message,
		imageUrl,
	})
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => res.status(400).json({ error }));
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
	Post.findAll({ order: [["createdAt", "desc"]] })
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});

// GET ALL POSTS FROM 1 USER

exports.getAllPostsFromUser = (req, res) => {
	const userId = req.params.id;
	Post.findAll({ order: [["createdAt", "desc"]], where: { userId: userId } })
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

// GET ONE POST

exports.getOnePost = (req, res, next) => {
	const postId = req.params.id;
	Post.findOne({ where: { id: postId } })
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

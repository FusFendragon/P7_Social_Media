const Post = require("../models/post");
const fs = require("fs");

// ADD POSTS
exports.createPost = (req, res, next) => {
	const imageOrNot = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null;
	const data = {
		userId: req.userId,
		message: req.body.message,
		imageUrl: imageOrNot,
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

exports.modifyPost = (req, res, next) => {
	let postObject;
	function postUpdate() {
		Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
			.then(() => res.status(200).json({ message: "Utilisateur Modifié !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	if (req.file) {
		Post.findOne({where: {id: req.params.id}}).then((post) => {
			const filename = post.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {});

			postObject = {
				...req.body,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
			};
			postUpdate();
		})
		.catch((error) => res.status(500).json({ error }));
	} else {
		postObject = { ...req.body };
		postUpdate();
	}
};

// DELETE POST

exports.deletePost = (req, res, next) => {
	Post.findOne({ where: {id: req.params.id} })
		.then((post) => {
			if (post.imageUrl !== null) {
				const filename = post.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					post.destroy({ id: req.params.id })
						.then(() => res.status(200).json({ message: "Post with image Deleted  !" }))
						.catch((error) => res.status(400).json({ error }));
				});
			} else {
				post.destroy({where: {id: req.params.id}})
					.then(() => res.status(200).json({ message: "Post Deleted !" }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json({ error }));
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


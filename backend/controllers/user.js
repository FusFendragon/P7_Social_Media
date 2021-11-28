const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
const User = require("../models/User");
const fs = require("fs");

require("dotenv").config();
const tokenSecret = process.env.TOKEN_SECRET;

// SIGNUP / ADD USER

exports.signup = (req, res, next) => {
	let passwordValidator = new RegExp("(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
	if (validator.validate(req.body.email) === false) {
		return res.status(401).json({ message: "Veuillez saisir un email valide !" });
	}
	if (passwordValidator.test(req.body.password) === false) {
		return res.status(401).json({ message: "Veuillez saisir un mot de passe plus complexe avec 8 caractères et un chiffre minimum" });
	}
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const imageOrNot = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : `${req.protocol}://${req.get("host")}/images/defaultAvatar.jpg`;
			const data = {
				email: req.body.email,
				password: hash,
				name: req.body.name,
				imageUrl: imageOrNot,
				bio: req.body.bio,
			};
			let { email, password, name, imageUrl, bio } = data;
			User.create({
				email,
				password,
				name,
				imageUrl,
				bio,
			})
				.then(() => res.status(201).json({ message: "Utilisateur créé !" }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// LOGIN / CHECK email and password

exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					console.log(user.id);
					res.status(200).json({
						userId: user.id,
						token: jwt.sign({ userId: user.id }, tokenSecret, { expiresIn: "24h" }),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
	User.findOne({ where: { id: req.params.id } })
		.then((user) => {
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					let password = req.body.newPassword ? req.body.newPassword : req.body.password;
					if (!valid) {
						return res.status(401).json({ message: "Ancien Mot de passe incorrect !" });
					}
					let passwordValidator = new RegExp("(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
					if (validator.validate(req.body.email) === false) {
						return res.status(401).json({ message: "Veuillez saisir un email nouvelle email valide !" });
					}
					if (passwordValidator.test(password) === false) {
						return res.status(401).json({ message: "Veuillez saisir un nouveau mot de passe plus complexe avec 8 caractères et un chiffre minimum" });
					}
					bcrypt
						.hash(password, 10)
						.then((hash) => {
							let userObject;
							function userUpdate() {
								User.update({ ...userObject, id: req.params.id }, { where: { id: req.params.id } })
									.then(() => res.status(200).json({ message: "Utilisateur Modifié !" }))
									.catch((error) => res.status(400).json({ error }));
							}

							if (req.file) {
								const filename = user.imageUrl.split("/images/")[1];
								console.log(filename);
								fs.unlink(`images/${filename}`, () => {});

								userObject = {
									...req.body,
									password: hash,
									imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
								};
								userUpdate();
							} else {
								userObject = { ...req.body, password: hash };
								userUpdate();
							}
						})
						.catch((error) => res.status(500).json({ error }));
				})
				.catch(() => res.status(500).json({ message: "La vérification du message est impossible" }));
		})
		.catch(() => res.status(500).json({ message: "Utilisateur inconnu" }));
};

// DELETE USER

exports.deleteUser = (req, res, next) => {
	const userId = req.params.id;
	User.findOne({ where: { id: userId } }).then((user) => {
		const defaultFilename = `defaultAvatar.jpg`;
		const filename = user.imageUrl.split("/images/")[1];
		console.log(filename);
		console.log(defaultFilename);
		if (filename === defaultFilename) {
			User.destroy({
				where: {
					id: userId,
				},
			})
				.then(() => res.status(201).json({ message: "Utilisateur supprimé !" }))
				.catch((error) => res.status(400).json({ error }));
		} else {
			fs.unlink(`images/${filename}`, () => {
				User.destroy({
					where: {
						id: userId,
					},
				})
					.then(() => res.status(201).json({ message: "Utilisateur supprimé !" }))
					.catch((error) => res.status(400).json({ error }));
			});
		}
	});
};

// GET ONE USER

exports.getOneUser = (req, res, next) => {
	const userId = req.params.id;
	console.log(userId);
	User.findOne({ where: { id: userId } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

exports.getAllUsers = (req, res) =>
	User.findAll()
		.then((Users) => {
			res.status(200).json(Users);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});

// PROMOTE OR DEMOTE ADMIN

exports.admin = (req, res, next) => {
	let administrator;
	function userUpdate() {
		User.update({ ...administrator, id: req.params.id }, { where: { id: req.params.id } })
			.then(() => res.status(200).json({ message: "Utilisateur Modifié !" }))
			.catch((error) => res.status(400).json({ error }));
	}
	User.findOne({ where: { id: req.params.id } }).then((user) => {
		administrator = { administrator: !user.administrator };
		userUpdate();
	});
};

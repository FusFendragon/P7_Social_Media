const express = require("express");
const path = require('path');


// MODELS
const User = require("./models/User");
const Post = require("./models/post");
const Comment = require("./models/comment");

// Database
const db = require("./config/database");

async function test() {
	try {
		await db.authenticate();
		console.log("Connecté à la base de données MySQL!");

// COMMENT THE LINE AFTER YOUR FIRST CONNECTION
		await db.sync({ force: true });


	} catch (error) {
		console.error("Impossible de se connecter, erreur suivante :", error);
	}
}
test();

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(express.json());

// Post routes

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/users", require("./routes/user"));
app.use("/posts", require("./routes/post"));
app.use("/comments", require("./routes/comment"));

module.exports = app;

// hasmany belongto eager&leasy loading

User.hasMany(Post, {
	onDelete: 'CASCADE'
});
Post.belongsTo(User);

Post.hasMany(Comment, {
	onDelete: 'CASCADE'
});
Comment.belongsTo(Post);

User.hasMany(Comment, {
	onDelete: 'CASCADE'
});
Comment.belongsTo(User);

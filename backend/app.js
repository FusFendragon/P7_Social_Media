const express = require("express");

// Database
const db = require("./config/database");

async function test() {
	try {
		await db.authenticate();
		console.log("Connecté à la base de données MySQL!");
		await db.sync({ force: true });
	} catch (error) {
		console.error("Impossible de se connecter, erreur suivante :", error);
	}
}
test();


const app = express();


// Post routes

app.use("/users", require("./routes/user"));
app.use("/posts", require("./routes/post"));
app.use("/comments", require("./routes/comment"));

module.exports = app;

const express = require("express");

// Database
const db = require("./config/database");

async function test() {
	try {
		await db.authenticate();
		console.log("Connecté à la base de données MySQL!");
		// await db.sync({ force: true });
	} catch (error) {
		console.error("Impossible de se connecter, erreur suivante :", error);
	}
}
test();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});
// Post routes

app.use("/users", require("./routes/user"));
app.use("/posts", require("./routes/post"));
app.use("/comments", require("./routes/comment"));

module.exports = app;

// hasmany belongto eager&leasy loading

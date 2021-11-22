const express = require("express");
const router = express.Router();
const db = require("../config/database");

const postCtrl = require("../controllers/post");

// GET ALL POSTS
router.get("/", postCtrl.getAllPosts);
router.post("/add", postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deletePost);

module.exports = router;

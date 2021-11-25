const express = require("express");
const router = express.Router();

const multer = require('../middleware/multer-config');
const postCtrl = require("../controllers/post");

// GET ALL POSTS
router.get("/", postCtrl.getAllPosts);
router.post("/add", multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", postCtrl.deletePost);
router.get("/user/:id", postCtrl.getAllPostsFromUser);

module.exports = router;

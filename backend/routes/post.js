const express = require("express");
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const authorChecker = require('../middleware/authorChecker');

const postCtrl = require("../controllers/post");

// GET ALL POSTS
router.get("/", postCtrl.getAllPosts);
router.post("/add", auth, authorChecker , multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.delete("/:id", authorChecker, postCtrl.deletePost);
router.get("/user/:id", postCtrl.getAllPostsFromUser);

module.exports = router;

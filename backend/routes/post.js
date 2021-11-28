const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const authorChecker = require("../middleware/authorChecker");

const postCtrl = require("../controllers/post");

router.get("/", postCtrl.getAllPosts);
router.post("/add", auth, multer, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", auth, multer,  postCtrl.modifyPost);
router.delete("/:id", auth, authorChecker, postCtrl.deletePost);
router.get("/user/:id", postCtrl.getAllPostsFromUser);

module.exports = router;

const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const authorChecker = require("../middleware/authorChecker");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/add", auth, multer, postCtrl.createPost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, authorChecker, postCtrl.modifyPost);
router.delete("/:id", auth, authorChecker, postCtrl.deletePost);
router.get("/user/:id", auth, postCtrl.getAllPostsFromUser);

module.exports = router;

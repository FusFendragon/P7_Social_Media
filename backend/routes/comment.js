const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const authorChecker = require("../middleware/authorChecker");

const commentCtrl = require("../controllers/comment");

router.get("/:id", commentCtrl.getComments);
router.delete("/:id", commentCtrl.deleteComment);
router.post("/add", auth, multer, commentCtrl.createComment);

module.exports = router;

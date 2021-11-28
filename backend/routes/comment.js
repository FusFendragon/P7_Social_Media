const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const authorChecker = require("../middleware/authorChecker");

const commentCtrl = require("../controllers/comment");

router.get("/:id", auth, commentCtrl.getComments);
router.delete("/:id", auth, authorChecker, commentCtrl.deleteComment);
router.post("/add", auth, multer, commentCtrl.createComment);

module.exports = router;

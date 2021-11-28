const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const commentAuthorChecker = require("../middleware/commentAuthorChecker.js");

const commentCtrl = require("../controllers/comment");

router.get("/:id", auth, commentCtrl.getComments);
router.delete("/:id", auth, commentAuthorChecker, commentCtrl.deleteComment);
router.post("/add", auth, multer, commentCtrl.createComment);

module.exports = router;

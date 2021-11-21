const express = require("express");
const router = express.Router();
const db = require("../config/database");

const commentCtrl = require("../controllers/comment");

router.get("/add", commentCtrl.createComment);
router.get("/:id", commentCtrl.getComments);
router.delete("/:id", commentCtrl.deleteComment);

module.exports = router;

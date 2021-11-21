const express = require('express');
const router = express.Router();
const db = require('../config/database');

const commentCtrl = require("../controllers/comment");


// GET ALL POSTS
router.get('/', commentCtrl.addComment);

module.exports = router;
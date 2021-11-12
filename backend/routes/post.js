const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Post = require('../models/post');

const postCtrl = require("../controllers/post");


// GET ALL POSTS
router.get('/', postCtrl.getAllPosts);
router.get('/add', postCtrl.createPost);
router.get('/:id', postCtrl.getOnePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;
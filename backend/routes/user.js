const express = require('express');
const router = express.Router();
const db = require('../config/database');

const userCtrl = require("../controllers/user");


// GET ALL POSTS
router.get('/', userCtrl.loginUser);

module.exports = router;
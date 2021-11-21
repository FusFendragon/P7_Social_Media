const Comment = require('../models/comment');
const db = require('../config/database');

exports.addComment = (req,res,next) => {
    res.status(201).json({ message: "test" })
}
const express = require("express");
const router = express.Router();

const multer = require('../middleware/multer-config');

const userCtrl = require("../controllers/user");



router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/modify/:id', multer,  userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;

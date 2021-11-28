const express = require("express");
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


const userCtrl = require("../controllers/user");
const authorChecker = require("../middleware/authorChecker");



router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', multer,  userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/admin/:id',  userCtrl.admin);

module.exports = router;

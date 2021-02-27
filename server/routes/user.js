const express = require('express');
const router = express.Router();

// controller
const controller = require('../controllers/userController');

// middleware
const checkLogin = require("../middleware/checkLogin")

router.get("/", controller.indexUserPage);
router.post("/signup", controller.addUser)
router.post("/signin", controller.checkUser)
router.get("/detail", checkLogin, controller.getUserData);
router.post("/addscore", checkLogin,  controller.addScore);
router.post("/decreasescore", checkLogin,  controller.decreaseScore);
router.post("/resetscore", checkLogin,  controller.resetScore);
module.exports = router;
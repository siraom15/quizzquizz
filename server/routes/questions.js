const express = require('express');
const router = express.Router();

// controller
const controller = require("../controllers/questionController")
// middleware
const checkLogin = require('../middleware/checkLogin')

router.post("/addquestion", checkLogin, controller.addQuestion);
router.get("/allquestion", checkLogin, controller.getAllQuestion);
router.delete("/deletequestion", checkLogin, controller.deleteQuestion);


module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require("../controllers/questionController")

const checkLogin = require('../middleware/checkLogin')
router.get("/test", checkLogin, (req, res, next) => {
    res.send("Test");
    console.log(req);
    res.end()
});
router.post("/addquestion", checkLogin, controller.addQuestion)
router.get("/allquestion", checkLogin, controller.getAllQuestion);

module.exports = router;
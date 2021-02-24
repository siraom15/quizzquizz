const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Questions = mongoose.model("Questions");

const checkLogin = require('../middleware/checkLogin')
router.get("/test", checkLogin, (req, res, next) => {
    res.send("Test");
    console.log(req);
    res.end()
});
router.post("/createquestion", checkLogin, (req, res, next) => {
    let { questionTitle, questionDescribe, choices, score } = req.body;
    console.log(req.body);
    if (questionTitle && choices) {
        let question = new Questions({
            questionTitle: questionTitle,
            questionDescribe: questionDescribe,
            choices: choices,
            userId: req.user_data._id,
            score: score
        })
        question.save().then(
            result => {
                res.json({ question: result })

            }
        ).catch(
            err => console.log(err)
        )
    } else {
        res.status(200).json({
            "error": "Please fill all question body"
        });
    }
})
router.get("/allquestion", checkLogin, (req, res, next) => {
    Questions.find().then((questions) => {
        res.status(200).json({ questions: questions })
    }).catch(err => {
        res.status(404).json({ "error": err })
    })
});

module.exports = router;
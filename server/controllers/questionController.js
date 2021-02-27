// mongo
const mongoose = require('mongoose');
const Questions = mongoose.model("Questions");

const addQuestion = (req, res, next) => {
    let { questionTitle, questionDescribe, choices, score, category } = req.body;
    if (questionTitle && choices && category) {
        let question = new Questions({
            questionTitle: questionTitle,
            questionDescribe: questionDescribe,
            choices: choices,
            userId: req.user_data._id,
            score: score,
            category: category
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
}
const getAllQuestion = (req, res, next) => {
    Questions.find().then((questions) => {
        res.status(200).json({ questions: questions })
    }).catch(err => {
        res.status(404).json({ "error": err })
    })
}
const deleteQuestion = (req, res, next) => {
    const { _id = req._id } = req.body;
    Questions.findOneAndDelete({ _id: _id, userId : req.user_data._id }).then(
        res.status(200).json({
            "success" : "Delete successfully"
        })
    ).catch(err => console.log(err))
}


module.exports = {
    addQuestion,
    getAllQuestion,
    deleteQuestion
}
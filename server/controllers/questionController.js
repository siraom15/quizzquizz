// mongo
const mongoose = require('mongoose');
const Questions = mongoose.model("Questions");
const Choices = mongoose.model("Choices")

const addQuestion = (req, res, next) => {
    let { questionTitle, questionDescribe, choices, score, category } = req.body;
    if (questionTitle && choices && category) {
        let question = new Questions({
            questionTitle: questionTitle,
            questionDescribe: questionDescribe,
            choices: choices,
            userId: mongoose.Types.ObjectId(req.user_data._id),
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

    Questions.findOneAndDelete({ _id: _id, userId: req.user_data._id }).then(
        res.status(200).json({
            "success": "Delete successfully"
        })
    ).catch(err => console.log(err))
}
const updateScore = (req, res, next) => {
    const { score, questionId } = req.body;
    if (score < 0) return;
    Questions.findOneAndUpdate({ _id: questionId, userId: req.user_data._id }, { $set: { score: score } }).then(
        data => {
            if (data) {
                res.status(200).json({
                    "success": "update successfully",
                    "question_data": data
                })
            } else {
                res.status(422).json({
                    "error": "not found question"
                })
            }

        }
    )
        .catch(err => {
            console.log(err);
        })
}
const addChoices = (req, res, next) => {
    const { choices, questionId } = req.body;
    if (!choices || !questionId) return res.status(422).json({ "error": "Please Fill the form" })
    console.log(choices + " " + questionId);
    Questions.findOneAndUpdate({ _id: mongoose.Types.ObjectId(questionId), userId: mongoose.Types.ObjectId(req.user_data._id) }, { $push: { choices: choices } })
        .then(data => {
            if (data) {
                res.status(200).json({
                    "success": "Update successfully",
                    "question_data": data
                })
            } else {
                res.status(200).json({
                    "success": "No Permission",
                    "question_data": data
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
const getQuestionById = (req, res,next)=>{
    const {questionId} =req.body;
    if(questionId){
        Questions.findById(mongoose.Types.ObjectId(questionId)).then(
            data =>{
                if(data)
                console.log(data);
            }
        ).catch(err=>{
            
        })
    }

}

module.exports = {
    addQuestion,
    getAllQuestion,
    deleteQuestion,
    updateScore,
    addChoices,
    getQuestionById
}
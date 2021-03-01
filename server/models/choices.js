const mongoose = require('mongoose');

const choiceSchema = new mongoose.Schema({
    body : {
        type : String,
        required : true,
        default : ""
    },
    isAnswer : {
        type : Boolean,
        required : true,
        default : false
    }
});

mongoose.model("Choices", choiceSchema);
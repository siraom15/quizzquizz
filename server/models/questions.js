const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    questionTitle  : {
        type : String,
        trim : true,
        required : true,
        default : null
    },
    questionDescribe : {
        type : String,
        trim : true,
        default : null
    },
    choices : [
        {
            index : true,
            type : String,
            isAnswer : Boolean,
            required : true,
        }
    ],
    userId : {
        type : mongoose.Types.ObjectId
    }

}); 
mongoose.model("Questions",questionsSchema)

mongoose.model("Question", questionsSchema);
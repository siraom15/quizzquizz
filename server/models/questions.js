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
            body: {
                type : String,
                required : true
            },
            isAnswer : {
                type : Boolean,
                required : true,
                default : false
            }
        }
    ],
    score : {
        type : Number,
        default : 0
    },
    userId : {
        type : mongoose.Types.ObjectId
    },
    category : {
        type : String
    }

}); 

mongoose.model("Questions",questionsSchema);

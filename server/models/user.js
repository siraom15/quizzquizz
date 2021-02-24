const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim : true,
        lowercase : true,
    },
    email: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required: true,
    },
    score : {
        type : Number,
        default : 0,
    },
    userType : {
        type : String,
        required : true,
        default : "student",
    }
});

mongoose.model("User", userSchema)
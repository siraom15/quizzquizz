var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
//keys
let { MONGOURI } = require("./keys");

// database
const mongoose = require('mongoose');
//connect db
console.log(MONGOURI);
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((error) => {
        console.log(error);
    })

//model 
require('./models/user')
require('./models/questions')

// router
var questionRouter = require('./routes/questions')
var userRouter = require('./routes/user')


var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/questions', questionRouter);
app.use('/api/user', userRouter);

module.exports = app;

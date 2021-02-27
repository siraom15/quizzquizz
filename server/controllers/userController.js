const mongoose = require('mongoose');
const User = mongoose.model("User")

// 
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require('../keys');
const bcrypt = require('bcrypt');
const saltRounds = 2;

const indexUserPage = (req, res, next) => {
    res.send("User page");
    res.end();
}
const getUserData = (req, res, next) => {
    const _id = req.user_data._id;
    if (_id) {
        User.find({ _id: _id })
            .then(data => {
                res.status(200).json({
                    userdata: data
                })
            })
            .catch(err => console.log(err))
    } else {
        res.status(422).json({
            "error": "Please Login"
        })
    }

}
const addUser = (req, res, next) => {
    const {
        username, email, password
    } = req.body;
    console.log(req.body);
    if (username && email && password) {
        User.find({
            "$or": [{
                username: username
            }, {
                email: email
            }]
        }).then(result => {
            if (result.length > 0) {
                res.status(422).json({
                    "error": "Email Or Username Already taken"
                })
            } else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) console.log(err);
                    const user = new User({
                        username: username,
                        email: email,
                        password: hash,
                        score: 0,
                        userType: "student",
                    });
                    user.save()
                        .then(user => {
                            res.status(200).json({
                                "success": "Sign up success"
                            })
                        }).catch(err => {
                            console.log(err)
                        })

                });
            }
        })
    } else {
        res.status(422).json({
            "error": "Please fill the form"
        })
    }
}
const checkUser = (req, res, next) => {
    const {
        email, password
    } = req.body;
    if (email && password) {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) console.log(err);
                        if (result) {
                            console.log(JWTSECRET);
                            let token = jwt.sign({
                                _id: user._id
                            }, JWTSECRET, { expiresIn: '2y' });
                            console.log(token);
                            res.status(200).json({
                                "success": "signin success",
                                "token": token
                            })
                        } else {
                            res.status(422).json({
                                "error": "Password Incorrect"
                            })
                        }
                    });
                } else {
                    res.status(422).json({
                        "error": "Login failure"
                    })
                }
            })
    } else {
        res.status(422).json({
            "error": "Please Input Email Or Password"
        })
    }
}
const addScore = (req, res, next) => {
    const { score } = req.body;
    const update = { score : req.user_data.score + score }
    User.findOneAndUpdate({ _id: req.user_data._id }, update).then(
        res.status(200).json({
            "success" : "updated"
        })
    ).catch(err => console.log(err))
}
const decreaseScore = (req, res, next) => {
    const { score } = req.body;
    const update = { score : req.user_data.score - score }
    User.findOneAndUpdate({ _id: req.user_data._id }, update).then(
        res.status(200).json({
            "success" : "updated"
        })
    ).catch(err => console.log(err))
}
const resetScore = (req, res, next) => {
    const update = { score : 0 }
    User.findOneAndUpdate({ _id: req.user_data._id }, update).then(
        res.status(200).json({
            "success" : "updated"
        })
    ).catch(err => console.log(err))
}

module.exports = {
    getUserData,
    indexUserPage,
    addUser,
    checkUser,
    addScore,
    decreaseScore,
    resetScore
}
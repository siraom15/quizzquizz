const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

const bcrypt = require('bcrypt');
const saltRounds = 2;

router.post("/signup", (req, res, next) => {
    const {
        username, email, password
    } = req.body;
    console.log(req.body);
    if (username && email && password ) {
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
                                "success" : "Sign up success"
                            })
                        }).catch(err => {
                            console.log(err)
                        })

                });
            }
        })
    }else{
        res.status(422).json({
            "error" : "Please fill the form"
        })
    }
})

module.exports = router;
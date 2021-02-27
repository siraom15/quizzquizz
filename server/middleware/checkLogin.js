const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const { JWTSECRET } = require('../keys')
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.trim().replace("Bearer ", "")
        try {
            let data = jwt.verify(token, JWTSECRET);
            User.findOne({ _id: data._id }).then((user_data) => {
                req.user_data = user_data;
                next();
            }).catch(err =>
                console.log(err));
        } catch (err) {
            return res.status(401).json({
                "error": "You must login first"
            })
        }
    } else {
        return res.status(401).json({
            "error": "You must login first"
        })
    }

}
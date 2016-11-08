var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash = require('password-hash');


router.route('/').post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    console.log(req.cookies);
    mongoose.model('Profile').find({
        username:req.body.username,
        passwordHash: passwordHash
    }, function (err, contact) {
        if (err) {
            res.send('Problem logging in.');
        } else {
            res.cookie('login', contact._id);
        }
    });
});

module.exports = router;
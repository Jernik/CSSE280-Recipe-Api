var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();


router.route('/').post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    console.log(req.cookies);
    mongoose.model('Profile').findOne({
        username: req.body.username,

    }, function (err, contact) {
        if (err) {
            res.send('Problem logging in.');
        } else {
            console.log(req.body.passwordHash, contact.passwordHash);
            if (req.body.passwordHash === contact.passwordHash) {
                res.cookie('login', contact._id);
                res.send("logged in");
            }else{
                res.send("Invalid password");
            }
        }
    });
});

module.exports = router;
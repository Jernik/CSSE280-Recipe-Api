var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();


router.route('/').post(function (req, res, next) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    var Profile = mongoose.model("Profile");
    var newProfile = new Profile({
        username: req.body.username,
        passwordHash: req.body.passwordHash,
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    });
    Profile.count({username: req.body.username}, function (err, count) {
        if (count === 0) {
            newProfile.save(function (err, contact) {
                if (err) {
                    res.send('Problem registering.');
                } else {
                    res.cookie('login', contact._id); //go ahead and log the user in too
                    res.send({"message":"registered"});
                }
            });
        } else{
            res.status(409);
            res.body = res.body + "username already in use";
            res.send();
        }
    })

});

module.exports = router;
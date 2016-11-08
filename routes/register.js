var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();


router.route('/').post(function (req, res, next) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    console.log(req.cookies);
    var Profile = mongoose.model("Profile");
    console.log(req.body);
    var newProfile = new Profile({
        username: req.body.username,
        passwordHash: req.body.passwordHash// Need to add the rest of the fields
    });
    //TODO make sure this username is unique
    newProfile.save(function (err, contact) {
        if (err) {
            res.send('Problem registering.');
        } else {
            res.cookie('login', contact._id); //go ahead and log the user in too
            res.send("registered");
        }
    });
});

module.exports = router;
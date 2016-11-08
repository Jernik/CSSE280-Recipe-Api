var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash = require('password-hash');

// router.post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
//     mongoose.model('Profile').get({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         passwordHash: passwordHash.generate(req.body.password),
//         homePhone: req.body.homePhone,
//         cellPhone: req.body.cellPhone,
//         birthDay: req.body.birthDay,
//         website: req.body.website,
//         address: req.body.address
//     }, function (err, contact) {
//         if (err) {
//             res.send('Problem logging in.');
//         } else {
//             res.send(contact.id);
//         }
//     });
// });
var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash=require('password-hash');

/* GET users listing. */
router.route('/').get(function(req, res, next) {
  mongoose.model('Profile').find({}, function (err, profiles) {
      if (err) {
          return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
      } else {
          res.format({
              json: function () {
                  res.json(profiles);
              }
          });
      }
  });
});


router.route("/:id").get( function (req, res, next) {
    console.log(req.params.id);
    res.send();
});

module.exports = router;

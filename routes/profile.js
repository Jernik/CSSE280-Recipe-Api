var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash=require('password-hash');

/* GET users listing. */
router.get('/', function(req, res, next) {
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


router.route("/:id").get();

module.exports = router;

var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash=require('password-hash'),bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

/* GET users listing. */
router.route('/').get(function(req, res, next) {
  mongoose.model('Message').find({}, function (err, profiles) {
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

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
//For creating a new message
router.route('/:username').post(function (req, res, next) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    var Message = mongoose.model("Message");
    var newMessage = new Message({
        content:req.body.content,
        author:req.param.username,
        timeStamp: new Date()
    });
    newMessage.save(function (err, contact) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({"message":"Saved message"});
                }
            });

});

// route middleware to validata :id
router.param('id', function (req, res, next, id) {
    mongoose.model('Message').findById(id, function (err, contact) {
        if (err || contact === null) {
            res.status(404);
            err = new Error('Not Found');
            err.status = 404;
            res.format({
                // html: function(){
                //     next(err);
                // },
                json: function () {
                    res.json({ message: err.status + ' ' + err });
                }
            });
        } else {
            // once validation is done, save new id in the req
            req.id = id;
            next();
        }
    });
});

router.route('/:id')
    .get(function (req, res) {
        mongoose.model('Message').findById(req.id, function (err, contact) {
            if (err) {
                return console.log(err);
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        });
    })
    .put(function (req, res) {
        mongoose.model('Message').findByIdAndUpdate(req.id, req.body, function(err, contact){
            if (err) {
                return console.log(err);
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        })
    })
    .delete(function (req, res) {
        mongoose.model('Message').findByIdAndRemove(req.id, function (err, contact) {
            if (err) {
                return console.log(err);
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        })
    });

module.exports = router;

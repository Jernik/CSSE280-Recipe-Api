var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var passwordHash=require('password-hash'),bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

/* GET conversation listing. */
router.route('/').get(function(req, res, next) {
  mongoose.model('Conversation').find({}, function (err, profiles) {
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
router.route('/:logged-:to').get(function(req, res, next) {
  mongoose.model('Conversation').find({participants:[req.params.logged, req.params.to]}, function (err, conversation) {
      if (err) {
          return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
      } else {
          res.format({
              json: function () {
                  res.json(conversation);
              }
          });
      }
  });
});

router.route('/:logged-:to').post(function (req, res, next) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
    var Conversation = mongoose.model("Conversation");
    var newConversation = new Conversation({
        participants: [req.params.logged, req.params.to]
    });
    Conversation.count({participants:[req.params.logged, req.params.to]}, function (err, count) {
        if (count === 0) {
            newConversation.save(function (err, contact) {
                if (err) {
                    res.send('Problem starting chat.');
                } else {
                    res.send({"message":"registered"});
                }
            });
        } else{
            res.status(409);
            res.body = res.body + "chat started";
            res.send();
        }
    })

});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// route middleware to validata :id
router.param('id', function (req, res, next, id) {
    mongoose.model('Conversation').findById(id, function (err, contact) {
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
        mongoose.model('Conversation').findById(req.id, function (err, contact) {
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
        mongoose.model('Conversation').findByIdAndUpdate(req.id, req.body, function(err, contact){
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
        mongoose.model('Conversation').findByIdAndRemove(req.id, function (err, contact) {
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

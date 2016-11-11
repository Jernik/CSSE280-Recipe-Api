
var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();


/* GET users listing. */
router.route('/').get(function(req, res, next) {
    mongoose.model('Recipe').find({}, function (err, recipes) {
        if (err) {
            return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
        } else {
            res.format({
                json: function () {
                    res.json(recipes);
                }
            });
        }
    });
});
router.param('id', function (req, res, next, id) {
    mongoose.model('Recipe').findById(id, function (err, contact) {
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
        console.log(req.param.id);
        mongoose.model('Recipe').findById(req.id, function (err, recipe) {
            console.log(recipe);
            if (err) {
                return console.log(err);
            } else {
                res.format({
                    json: function () {
                        res.json(recipe);
                    }
                });
            }
        });
    });



module.exports = router;
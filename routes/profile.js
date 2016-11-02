var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

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
    mongoose.model('Contact').findById(id, function (err, contact) {
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
        mongoose.model('Profile').findById(req.id, function (err, contact) {
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
        mongoose.model('Profile').findByIdAndUpdate(req.id, req.body, function(err, contact){
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
        mongoose.model('Profile').findByIdAndRemove(req.id, function (err, contact) {
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
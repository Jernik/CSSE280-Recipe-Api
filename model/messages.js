var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    content: String,
    timeStamp:Date,
    author: String
});

mongoose.model('Message', messageSchema);

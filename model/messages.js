var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    content: String,
    timeStamp:Date
});

mongoose.model('Message', messageSchema);

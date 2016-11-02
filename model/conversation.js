var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
    participants:[Profile],
    messages:[Message]
});

mongoose.model('Conversation', conversationSchema);

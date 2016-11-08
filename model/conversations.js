var mongoose = require('mongoose');

var conversationSchema = new mongoose.Schema({
    participants:[{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
    messages:[{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

mongoose.model('Conversation', conversationSchema);

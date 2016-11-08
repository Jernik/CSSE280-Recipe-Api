var mongoose = require('mongoose');

var profileSchema  = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    passwordHash: String,
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}], //We will perform lookups for these
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
    profilePicture:[{data:Buffer, name:String}]
});


mongoose.model('Profile', profileSchema);

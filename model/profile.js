var mongoose = require('mongoose');

var profileSchema  = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    passwordHash: String,
    recipes: [ObjectId], //We will perform lookups for these
    friends: [ObjectId],
    profilePicture:[{data:Buffer, name:String}]
});


mongoose.model('Profile', profileSchema);

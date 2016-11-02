var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    name: String,
    author: Profile,
    description: String,
    ingredients: [{name:String, amount:String}],
    steps: [{stepDefinition: String}],
    pictures:[{data:Buffer, name:String}]
});


mongoose.model('Recipe', recipeSchema);

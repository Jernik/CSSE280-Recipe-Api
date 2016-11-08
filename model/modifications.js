var mongoose = require('mongoose');

var recipeModificationSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    ingredientChanges: [{index: Number,name:String, amount:String}],
    stepChanges:[{index: Number, stepDefinition:String}]
});

mongoose.model('Modification', recipeModificationSchema);

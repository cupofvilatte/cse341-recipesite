const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [String],
    instructions: String,
    prepTime: Number,
    cookTime: Number,
    category: String,
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);

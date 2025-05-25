const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: String,
  prepTime: Number,
  cookTime: Number,
  category: String,
  author: String,
});

module.exports = mongoose.model('Recipe', recipeSchema);

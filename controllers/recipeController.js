const Recipe = require('../models/recipe');

// GET all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe({
            ...req.body,
            user: req.user._id,
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create recipe' });
    }
};



// GET recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid recipe ID'});
        }
        res.status(500).json({ message: 'Error fetching recipe', error: err });
    }
};

// PUT (update) recipe
exports.updateRecipe = async (req, res) => {
    try {
        const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update', error: err });
    }
};

// DELETE recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const deleted = await Recipe.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete', error: err });
    }
};

exports.getUserRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user recipes' });
    }
};

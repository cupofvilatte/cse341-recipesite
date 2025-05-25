const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
* @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *   post:
 *     summary: Create a new recipe
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *   put:
 *     summary: Update a recipe
 *   delete:
 *     summary: Delete a recipe
 */
router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;

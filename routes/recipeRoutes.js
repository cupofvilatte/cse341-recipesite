const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const recipeController = require('../controllers/recipeController');
const { ensureAuth } = require('../middleware/ensureAuth');

// Validation rules for POST and PUT
const validateRecipe = [
  body('title').notEmpty().withMessage('Title is required'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be an array with at least one item'),
  body('instructions').notEmpty().withMessage('Instructions are required'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     responses:
 *       200:
 *         description: A list of recipes
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - ingredients
 *               - instructions
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Validation error
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *       404:
 *         description: Recipe not found
 *   put:
 *     summary: Update a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - ingredients
 *               - instructions
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Recipe not found
 *   delete:
 *     summary: Delete a recipe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 *       404:
 *         description: Recipe not found
 */

// Routes
router.get('/', recipeController.getAllRecipes);
router.post('/', ensureAuth, validateRecipe, handleValidationErrors, recipeController.createRecipe);

router.get('/:id', recipeController.getRecipeById);
router.put('/:id', validateRecipe, handleValidationErrors, recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

/**
 * @swagger
 * /api/recipes/mine:
 *   get:
 *     summary: Get recipes created by the authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user's recipes
 *       401:
 *         description: Unauthorized
 */
router.get('/mine', ensureAuth, recipeController.getUserRecipes);

// Route to simulate 500 error
router.get('/test/server-error', (req, res, next) => {
    throw new Error('Simulated server error');
});


module.exports = router;

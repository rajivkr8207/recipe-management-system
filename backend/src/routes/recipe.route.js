const express = require('express');
const RecipeController = require('../controllers/recipe.controller');
const IdentifyUser = require('../middleware/auth.middleware');
const RecipeRouter = express.Router()


RecipeRouter.post('/create', IdentifyUser, RecipeController.CreateRecipe)
RecipeRouter.get('/', IdentifyUser, RecipeController.getMyAllRecipes)
RecipeRouter.get('/all', IdentifyUser, RecipeController.getAllRecipes)
RecipeRouter.get('/:id', IdentifyUser, RecipeController.getRecipeById)
RecipeRouter.put('/:id', IdentifyUser, RecipeController.updateRecipe)
RecipeRouter.delete('/:id', IdentifyUser, RecipeController.deleteRecipe)
RecipeRouter.get('',IdentifyUser, RecipeController.searchRecipes)

module.exports = RecipeRouter;
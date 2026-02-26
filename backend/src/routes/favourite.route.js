const express = require('express');
const IdentifyUser = require('../middleware/auth.middleware');
const { FetchMyFavRecipe, createFavourite, DeletedFavourite } = require('../controllers/favourite.controller');
const FavouriteRouter = express.Router()


FavouriteRouter.post('/:id', IdentifyUser, createFavourite)
FavouriteRouter.delete('/:id', IdentifyUser, DeletedFavourite)
FavouriteRouter.get('/all', IdentifyUser, FetchMyFavRecipe)

module.exports = FavouriteRouter;
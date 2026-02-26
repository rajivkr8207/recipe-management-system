const FavouriteModel = require("../models/favourite.model")



const createFavourite = async (req, res) => {
    const recipeid = req.params.id
    console.log(recipeid);
    // const alreadyfav = await FavouriteModel.find({
    //     author: req.user.id,
    //     recipe: recipeid,
    //     isfavourite: true
    // })
    // if (alreadyfav) {
    //     return res.status(409).json({
    //         message: "this recipe is already favourite"
    //     })
    // }
    const fav = await FavouriteModel.create({
        author: req.user.id,
        recipe: recipeid,
        isfavourite: true
    })

    return res.status(201).json({
        message: "favourite recipe add successfully",
        fav
    })
}
const FetchMyFavRecipe = async (req, res) => {
    const favrecipe = await FavouriteModel.find({
        author: req.user.id
    })
    return res.status(200).json({
        message: "fech all fav recipe",
        favrecipe
    })
}
const DeletedFavourite = async (req, res) => {
    const recipeid = req.params.id
    const alreadyfav = await FavouriteModel.find({
        author: req.user.id,
        recipe: recipeid,
        isfavourite: true
    })
    if (!alreadyfav) {
        return res.status(409).json({
            message: "recipe is not exist"
        })
    }
    await FavouriteModel.findByIdAndDelete(alreadyfav._id)
    return res.status(204).json({
        message: "favourite recipe deleted successfully",
    })
}


module.exports = {
    createFavourite,
    DeletedFavourite,
    FetchMyFavRecipe
}
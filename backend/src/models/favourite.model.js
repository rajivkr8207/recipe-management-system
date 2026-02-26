const mongoose = require('mongoose')


const favouriteScheme = new mongoose.Schema({
    isfavourite: {
        type: Boolean,
        required: [true, "favourite is requrired"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
}, { timestamps: true });

const FavouriteModel = mongoose.model("Favourite", favouriteScheme)
module.exports = FavouriteModel
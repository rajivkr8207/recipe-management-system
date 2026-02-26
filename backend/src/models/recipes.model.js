const mongoose = require('mongoose')


const recipieScheme = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String, required: true
    },
    ingredients: [
        {
            type: String, required: true
        }],
    instructions: [
        {
            type: String, required: true
        }],

    cookingTime: { type: Number, required: true },

    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "easy"
    },

    category: { type: String, required: true },

    tags: [{ type: String }],

    image: { type: String },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublished: { type: Boolean, default: true }
}, { timestamps: true });

const RecipieModel = mongoose.model("Recipe", recipieScheme)
module.exports = RecipieModel
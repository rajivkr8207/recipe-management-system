const RecipieModel = require("../models/recipes.model");




const CreateRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            difficulty,
            category,
            tags,
            image,
            isPublished
        } = req.body;

        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const recipe = await RecipieModel.create({
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            difficulty,
            category,
            tags,
            image,
            isPublished,
            author: req.user.id
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipieModel
            .find({ author: req.user.id })
            .populate("author", "username email")
            .sort({ createdAt: -1 });
        return res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await RecipieModel
            .find({ isPublished: true })
            .populate("author", "username email")
            .sort({ createdAt: -1 });

        return res.status(200).json(recipes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await RecipieModel
            .findById(req.params.id)
            .populate("author", "username fullname");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await RecipieModel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const updatedRecipe = await RecipieModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Recipe updated",
            updatedRecipe
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await RecipieModel.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (recipe.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await recipe.deleteOne();

        res.status(200).json({ message: "Recipe deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /api/recipes?search=...&difficulty=...&category=...
const searchRecipes = async (req, res) => {
  try {
    const { search, difficulty, category } = req.query;

    let query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ];
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (category) {
      query.category = category;
    }

    const recipes = await RecipieModel.find(query).populate("author", "fullname");

    return res.status(200).json({
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
    CreateRecipe,
    getMyAllRecipes,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    searchRecipes
}
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/CreateRecipe.scss";
import useRecipe from "../hooks/useRecipe";
import { fetchRecipeById } from "../services/recipe.api";

function UpdateRecipe() {
    const { id } = useParams();
    const { handleUpdate } = useRecipe();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        cookingTime: "",
        difficulty: "easy",
        category: "",
        tags: "",
        image: "",
        isPublished: true,
    });

    // Fetch recipe data
    useEffect(() => {
        const fetchRecipe = async () => {
            const data = await fetchRecipeById(id);

            setFormData({
                ...data,
                tags: data.tags?.join(", "),
            });
        };

        fetchRecipe();
    }, [id]);

    // Basic change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Ingredients
    const handleIngredientChange = (index, value) => {
        const updated = [...formData.ingredients];
        updated[index] = value;
        setFormData({ ...formData, ingredients: updated });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, ""],
        });
    };

    const removeIngredient = (index) => {
        const updated = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: updated });
    };

    // Instructions
    const handleInstructionChange = (index, value) => {
        const updated = [...formData.instructions];
        updated[index] = value;
        setFormData({ ...formData, instructions: updated });
    };

    const addInstruction = () => {
        setFormData({
            ...formData,
            instructions: [...formData.instructions, ""],
        });
    };

    const removeInstruction = (index) => {
        const updated = formData.instructions.filter((_, i) => i !== index);
        setFormData({ ...formData, instructions: updated });
    };

    // Submit Update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags.split(",").map((t) => t.trim()),
        };

        await handleUpdate(id, payload);
    };

    return (
        <div className="create-recipe">
            <h1>Update Recipe</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Recipe Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                {/* Ingredients */}
                <div className="block">
                    <h3>Ingredients</h3>
                    {formData.ingredients.map((item, i) => (
                        <div key={i} className="row">
                            <input
                                value={item}
                                onChange={(e) =>
                                    handleIngredientChange(i, e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeIngredient(i)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>
                        + Add Ingredient
                    </button>
                </div>

                {/* Instructions */}
                <div className="block">
                    <h3>Instructions</h3>
                    {formData.instructions.map((item, i) => (
                        <div key={i} className="row">
                            <textarea
                                value={item}
                                onChange={(e) =>
                                    handleInstructionChange(i, e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeInstruction(i)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction}>
                        + Add Step
                    </button>
                </div>

                <input
                    type="number"
                    name="cookingTime"
                    placeholder="Cooking Time (minutes)"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    required
                />

                <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <input
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={handleChange}
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <label className="checkbox">
                    <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                isPublished: e.target.checked,
                            })
                        }
                    />
                    Public Recipe
                </label>

                <button className="submit-btn">Update Recipe</button>
            </form>
        </div>
    );
}

export default UpdateRecipe;
import React, { useState } from "react";
import "../styles/RecipeDetails.scss";
import { useParams } from "react-router";
import { fetchRecipeById } from "../services/recipe.api";
import { useEffect } from "react";

const RecipeDetails = () => {
    const {id} = useParams()
    const [recipe, setrecipe] = useState(null)

    async function FetchRecipe() {
        const res = await fetchRecipeById(id)
        setrecipe(res)
    }

    useEffect(() => {
        FetchRecipe()
    }, [])
    
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-details">
      {/* IMAGE SECTION */}
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.title} />
      </div>

      {/* CONTENT SECTION */}
      <div className="recipe-content">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>

          <div className="meta-info">
            <span className={`difficulty ${recipe.difficulty}`}>
              {recipe.difficulty}
            </span>
            <span>⏱ {recipe.cookingTime} mins</span>
            <span>📂 {recipe.category}</span>
            <span>👨‍🍳 {recipe.author?.fullname}</span>
          </div>

          {recipe.tags?.length > 0 && (
            <div className="tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="description">{recipe.description}</p>

        {/* INGREDIENTS */}
        <div className="section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div className="section">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
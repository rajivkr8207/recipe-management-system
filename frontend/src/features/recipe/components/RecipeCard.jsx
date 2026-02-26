import { useNavigate } from "react-router";
import "../styles/RecipeCard.scss";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";
const RecipeCard = ({ recipe, User, handleDeleteRecipe }) => {
  const [ismyrecipe, setismyrecipe] = useState(false)
  const navigate = useNavigate()
  function findisMyrecipe() {
    if (recipe?.author._id == User?._id) {
      setismyrecipe(true)
    }
  }

  useEffect(() => {
    findisMyrecipe()
  }, [User])

  return (
    <div className="recipe-card" >
      {ismyrecipe && <>
        <div className="recipe_edit-delete">
          <button className="edit" onClick={() => navigate(`/recipe/update/${recipe._id}`)}><FiEdit /></button>
          <button className="delete" onClick={() => handleDeleteRecipe(recipe._id)}><FiTrash /></button>
        </div>
      </>}
      {/* Image */}
      <div className="recipe-card__image" onClick={() => navigate(`/recipe/${recipe._id}`)}>
        <img src={recipe.image} alt={recipe.title} />
        <span className={`difficulty ${recipe.difficulty}`}>
          {recipe.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="recipe-card__content" onClick={() => navigate(`/recipe/${recipe._id}`)}>

        <h2 className="title">{recipe.title}</h2>

        <p className="description">{recipe.description}</p>

        <div className="meta">
          <span>⏱ {recipe.cookingTime} mins</span>
          <span>📂 {recipe.category}</span>
        </div>

        <div className="ingredients">
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            {recipe.ingredients.length > 3 && <li>...</li>}
          </ul>
        </div>

        <div className="instructions">
          <h4>Instructions:</h4>
          <p>
            {recipe.instructions.length > 100
              ? recipe.instructions.substring(0, 100) + "..."
              : recipe.instructions}
          </p>
        </div>

        <div className="tags">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RecipeCard;
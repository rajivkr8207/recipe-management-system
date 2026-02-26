import { useNavigate } from "react-router";
import "../styles/RecipeCard.scss";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createFavorite } from "../services/recipe.api";
const RecipeCard = ({ recipe, User, handleDeleteRecipe }) => {
  const [ismyrecipe, setismyrecipe] = useState(false)
  const [isFavourite, setIsFavourite] = useState()

  useEffect(() => {
    setIsFavourite(recipe.isFavourite)
  }, [recipe])

  const navigate = useNavigate()
  function findisMyrecipe() {
    if (recipe?.author._id == User?._id) {
      setismyrecipe(true)
    }
  }

  useEffect(() => {
    findisMyrecipe()
  }, [User])



  const handleFavorite = async () => {
    console.log('click on fav');
    const res = await createFavorite(recipe._id)
    console.log(res);

    // try {
    // } catch (error) {
    //   console.error(error);
    // }
  }


  return (
    <div className="recipe-card" >
      {ismyrecipe && <>
        <div className="recipe_edit-delete">
          <button className="edit" onClick={() => navigate(`/recipe/update/${recipe._id}`)}><FiEdit /></button>
          <button className="delete" onClick={() => handleDeleteRecipe(recipe._id)}><FiTrash /></button>
        </div>
      </>}
      {/* fav_heart */}
      <div onClick={() => handleFavorite()} className={`recipe_fav_heart ${isFavourite && 'fav_heart'} `}>
        {isFavourite ?
          <FaHeart /> :
          <FaRegHeart />
        }
      </div>
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
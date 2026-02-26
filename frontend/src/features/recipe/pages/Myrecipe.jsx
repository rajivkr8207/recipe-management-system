import "../styles/Myrecipe.scss";
import RecipeCard from "../components/RecipeCard";
import useRecipe from "../hooks/useRecipe";
import { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";

function MyRecipes() {
  const { fetchMyRecipe, myrecipe,handleDeleteRecipe } = useRecipe();
  const {User} = useAuth()
  useEffect(() => {
    fetchMyRecipe();
  }, []);

  return (
    <div className="my-recipes">
      <div className="header">
        <h1>My Recipes</h1>
        <p>All recipes created by you</p>
      </div>
      <div className="home__grid">

        {myrecipe?.map((item, idx) => {
          return (
            <RecipeCard recipe={item} key={idx} User={User} handleDeleteRecipe={handleDeleteRecipe} />
          )
        })}
      </div>
    </div>
  );
}

export default MyRecipes;

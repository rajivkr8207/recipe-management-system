import { useEffect, useState } from "react";
import { RecipeContext } from "./recipe-context";
import api from "../axios/Axios";

const RecipeProvider = ({ children }) => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myrecipe, setMyRecipe] = useState(null)
  async function fetchMyRecipe() {
    try {
      const res = await api.get("/recipe");
      setMyRecipe(res.data.data)
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchRecipe() {
    try {
      const res = await api.get("/recipe/all");
      setRecipe(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    async function loadRecipe() {
      await fetchRecipe();
    }
    loadRecipe();
  }, []);
  return (
    <RecipeContext.Provider value={{ recipe, setLoading, loading, fetchMyRecipe, myrecipe, fetchRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
export default RecipeProvider;

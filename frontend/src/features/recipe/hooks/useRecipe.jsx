import { useContext } from "react";
import { RecipeContext } from "../recipe-context";
import api from "../../axios/Axios";
import { toast } from "react-toastify";
import { useHref, useNavigate } from "react-router";
import { DeletedRecipeById, searchRecipeByQuery, UpdateRecipeById } from "../services/recipe.api";

const useRecipe = () => {
  const context = useContext(RecipeContext);
  const navigate = useNavigate();
  let pathname = useHref()
  const { recipe, setLoading, loading, fetchMyRecipe, myrecipe, fetchRecipe } = context;

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const res = await api.post("/recipe/create", data);
      toast.success(res.data.message);
      fetchRecipe()
      fetchMyRecipe()
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (id) => {
    setLoading(true);
    try {
      const res = await DeletedRecipeById(id)
      toast.success(res.message);
      fetchRecipe()
      fetchMyRecipe()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdate = async (id, data) => {

    setLoading(true);
    try {
      const res = await UpdateRecipeById(id, data)
      toast.success(res.message);
      if (pathname == '/') {
        navigate('/')
      } else {
        navigate('/myrecipe')
      }
      fetchRecipe()
      fetchMyRecipe()
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const searchRecipe = async (params) => {
    const query = new URLSearchParams(params).toString();

    const res = await searchRecipeByQuery(query)
    console.log(res);
  };
  return { loading, handleCreate, recipe, fetchMyRecipe, myrecipe, handleDeleteRecipe, handleUpdate, searchRecipe };
};

export default useRecipe;

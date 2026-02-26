import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/recipe/pages/Home";
import AuthLayout from "./features/auth/AuthLayout";
import RecipeLayout from "./features/recipe/RecipeLayout";
import CreateRecipe from "./features/recipe/pages/CreateRecipe";
import Profile from "./features/recipe/pages/Profile";
import MyRecipes from "./features/recipe/pages/Myrecipe";
import RecipeDetails from "./features/recipe/pages/RecipeDetails";
import UpdateRecipe from "./features/recipe/pages/UpdateRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecipeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "recipe/create",
        element: <CreateRecipe />
      },
      {
        path: "myrecipe",
        element: <MyRecipes />
      },
      {
        path: "recipe/:id",
        element: <RecipeDetails />
      },
      {
        path: "/recipe/update/:id",
        element: <UpdateRecipe />
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;

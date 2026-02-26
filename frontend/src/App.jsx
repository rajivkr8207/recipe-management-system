import {  RouterProvider } from "react-router";
import "./features/shared/global.scss";
import router from "./app.routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./features/auth/AuthContext";
import RecipeProvider from "./features/recipe/RecipeContext";
const App = () => {
  return (
    <>
      <AuthProvider>
        <RecipeProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </RecipeProvider>
      </AuthProvider>
    </>
  );
};

export default App;

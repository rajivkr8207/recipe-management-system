import { Outlet } from "react-router"
import Navbar from "./components/Navbar"

const RecipeLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default RecipeLayout
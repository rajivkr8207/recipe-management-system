import { NavLink, useNavigate } from "react-router";
import "../styles/Navbar.scss";
import useAuth from "../../auth/hooks/useAuth";

function Navbar() {
  const { User, setUser, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <NavLink to="/">MyRecipeApp</NavLink>
      </div>

      {/* Center Links */}
      <ul className="navbar__links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/recipe/create">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/myrecipe">myRecipes</NavLink>
        </li>
      </ul>

      {/* Right Side */}
      <div className="navbar__right">
        <NavLink to="/profile" className="profile">
          {User?.username || "Profile"}
        </NavLink>

        <button onClick={() => onLogout()}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

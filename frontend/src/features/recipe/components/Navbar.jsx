import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import "../styles/Navbar.scss";
import useAuth from "../../auth/hooks/useAuth";

function Navbar() {
  const { User, setUser, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">Online Recipe</NavLink>
      </div>

      {/* Hamburger */}
      <div 
        className={`navbar__toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <ul className={`navbar__links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/recipe/create" onClick={() => setMenuOpen(false)}>Posts</NavLink>
        </li>
        <li>
          <NavLink to="/myrecipe" onClick={() => setMenuOpen(false)}>MyRecipes</NavLink>
        </li>
        <li>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
            {User?.username || "Profile"}
          </NavLink>
        </li>
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
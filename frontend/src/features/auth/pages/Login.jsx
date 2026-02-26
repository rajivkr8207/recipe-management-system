import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
  };
  return (
    <>
      <div className="form-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Login Account</h2>
          <p className="subtitle">Join us and get started</p>

          <div className="input-group">
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <button type="submit">Login</button>

          <p className="link">
            Not have an account?{" "}
            <span>
              <Link to="/auth/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

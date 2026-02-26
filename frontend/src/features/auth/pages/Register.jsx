import { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const { handleRegister } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <>
      <div className="form-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="subtitle">Join us and get started</p>

          <div className="input-group">
            <input
              type="text"
              name="fullname"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>

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
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
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

          <button type="submit">Register</button>

          <p className="link">
            Already have an account?{" "}
            <span>
              <Link to="/auth/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;

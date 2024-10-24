import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Login.css"; 

const Login = ({ auth, authAction, logout }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN", credentials);
    try {
      await authAction(credentials, "login");
      setError(null); 
      navigate("/businesses"); // Redirect to businesses 
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      {auth.token ? ( // logout button
        <>
          <h2>Welcome, {auth.username}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
// src/pages/Register.jsx
// Form for user registration

import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import "./Register.css";

const Register = ({ auth, authAction }) => {
  if (auth.id) return null;

  return <AuthForm authAction={authAction} mode="register" />;

  /*
  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
  */
};

export default Register;


// src/pages/Register.jsx
// Form for user registration

import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import "./Register.css";

const Register = ({ auth, authAction }) => {
  const navigate = useNavigate(); 

  const handleRegister = async (credentials) => {
    try {
      await authAction(credentials, "register");
      navigate("/login"); // Redirect to login
    } catch (err) {
      console.error("Registration failed:", err); 
    }
  };

  if (auth.token) return null;

  return <AuthForm authAction={handleRegister} mode="register" />; 
};

export default Register;
// src/pages/Users.jsx
// Displays a list of users

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";

const Users = ({ users, token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      setLoading(false); 
    } else {
      setError("No users found.");
      setLoading(false);
    }
  }, [users]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="users-list">
      {users.length > 0 ? (
        users.map(({ id, username }) => (
          <div key={id} className="user-item">
            <p>{username}</p>
            <Link to={`/users/${id}`}>See {username}'s reviews</Link>
          </div>
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};

export default Users;

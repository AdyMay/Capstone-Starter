// src/pages/Users.jsx
// Displays a list of users

import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users, token }) => {
  return (
    <>
      {users.length > 0 ? (
        users.map(({ id, username }) => (
          <div key={id}>
            <p>{username}</p>
            <Link to={`/users/${id}`}>See {username}'s reviews</Link>
          </div>
        ))
      ) : (
        <p> No users available. </p>
      )}
    </>
  );
};

export default Users;

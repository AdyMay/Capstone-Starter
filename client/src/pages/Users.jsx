// src/pages/Users.jsx
// Displays a list of users

import React from 'react';

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

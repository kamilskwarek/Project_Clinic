import React, { useState, useEffect } from 'react';

const Navbar = ({ appName, isLoggedIn, userEmail, user, onLogout }) => {
  return (
    <div className="navbar">
      <h1>{appName}</h1>
      {isLoggedIn && user && (
        <div className="user-info">
          <p>{user.email}</p>
          {user.jobPosition && <p>{user.jobPosition}</p>}
          <button onClick={onLogout}>Wyloguj</button>
        </div>
      )}


    </div>
  );
};

export default Navbar;

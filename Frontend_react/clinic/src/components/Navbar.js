import React from 'react';

const Navbar = ({ appName }) => {
  return (
    <div className="navbar">
      <h1>{appName}</h1>
    </div>
  );
};

export default Navbar;

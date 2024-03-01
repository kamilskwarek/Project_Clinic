import React from 'react';

const MenuItem = ({ item, onClick }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <span>{item.label}</span>
    </div>
  );
};

export default MenuItem;

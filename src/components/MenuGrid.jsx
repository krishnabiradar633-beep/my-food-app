import React from 'react';
import FoodCard from './FoodCard';
import './Menu.css';

const MenuGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="empty-menu animate-fade-in">
        <h2>No items found.</h2>
        <p>Try adjusting your search or category.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {items.map(item => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuGrid;

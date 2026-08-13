import React, { useState } from 'react';
import CustomizeModal from './CustomizeModal';
import './Menu.css';

const FoodCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="food-card glass-panel" onClick={() => setIsModalOpen(true)}>
        <div className="food-image-wrapper">
          <img 
            src={item.image} 
            alt={item.name} 
            className="food-image" 
            loading="lazy" 
            onError={(e) => {
              e.target.onerror = null;
              // Fallback to a stunning, rich gradient placeholder with the item name if image is missing
              e.target.src = `https://placehold.co/600x400/ff4b2b/ffffff?text=${encodeURIComponent(item.name)}`;
            }}
          />
          <div className="price-tag">${item.price.toFixed(2)}</div>
        </div>
        <div className="food-content">
          <h3 className="food-title">{item.name}</h3>
          <p className="food-desc">{item.description}</p>
          <button className="btn-add-circle" aria-label="Add to cart">
            +
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CustomizeModal 
          item={item} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default FoodCard;

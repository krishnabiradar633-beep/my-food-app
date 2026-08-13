import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';
import './Menu.css';

const CustomizeModal = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedOptions);
    onClose();
  };

  return createPortal(
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={18} />
        </button>
        
        <img src={item.image} alt={item.name} className="modal-header-img" />
        
        <div className="modal-body">
          <h2 className="modal-title">{item.name}</h2>
          <div className="modal-price">${item.price.toFixed(2)}</div>
          <p className="modal-desc">{item.description}</p>
          
          {item.options && item.options.length > 0 && (
            <div className="options-section">
              <h3 className="options-title">Customize your order</h3>
              {item.options.map((option, idx) => (
                <label key={idx} className="option-item">
                  <input 
                    type="checkbox" 
                    className="option-checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          <div className="modal-footer">
            <div className="quantity-control">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Order • ${(item.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomizeModal;

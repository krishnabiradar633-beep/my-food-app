import React from 'react';
import { ShoppingBag, Search, Moon, Sun, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ theme, toggleTheme, searchQuery, setSearchQuery }) => {
  const { getCartCount, setIsCartOpen } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="header">
      <div className="header-logo">
        <UtensilsCrossed size={28} />
        <span>DriveThru</span>
      </div>
      
      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <div className="cart-btn-wrapper">
          <button className="btn-icon" onClick={() => setIsCartOpen(true)} aria-label="Open Cart">
            <ShoppingBag size={20} />
          </button>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
};

export default Header;

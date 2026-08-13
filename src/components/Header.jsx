import React from 'react';
import { ShoppingBag, Search, Moon, Sun, UtensilsCrossed, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ theme, toggleTheme, searchQuery, setSearchQuery, hideSearch }) => {
  const { getCartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="header-logo">
          <UtensilsCrossed size={28} color="var(--accent-color)" />
          <span>QuickBite</span>
        </div>
      </Link>
      
      <div className="header-actions">
        {!hideSearch && (
          <div className="search-bar">
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search menu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        
        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin" className="btn-icon" title="Admin Dashboard">
                <LayoutDashboard size={20} />
              </Link>
            ) : (
              <Link to="/orders" className="btn-icon" title="My Orders">
                <User size={20} />
              </Link>
            )}
            <button className="btn-icon" onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-icon" title="Login">
            <User size={20} />
          </Link>
        )}

        {!hideSearch && (
          <div className="cart-btn-wrapper">
            <button className="btn-icon" onClick={() => setIsCartOpen(true)} title="Cart">
              <ShoppingBag size={20} />
            </button>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

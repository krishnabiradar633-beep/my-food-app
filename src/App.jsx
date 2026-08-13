import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import OrderProgress from './components/OrderProgress';
import { categories, menuItems } from './data';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderProgressOpen, setIsOrderProgressOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlaceOrder = () => {
    setIsCheckoutOpen(false);
    setIsOrderProgressOpen(true);
  };

  return (
    <CartProvider>
      <div className="app-container">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="main-content">
          <section className="hero">
            <h1 className="animate-slide-up">Craving Something Delicious?</h1>
            <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Order ahead and pick it up at the drive-through. Fast, fresh, and exactly how you like it.
            </p>
          </section>

          <nav className="category-nav animate-fade-in">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <MenuGrid items={filteredMenu} />
        </main>

        <CartSidebar onCheckout={() => setIsCheckoutOpen(true)} />
        
        {isCheckoutOpen && (
          <CheckoutModal 
            onClose={() => setIsCheckoutOpen(false)} 
            onConfirm={handlePlaceOrder} 
          />
        )}

        {isOrderProgressOpen && (
          <OrderProgress onClose={() => setIsOrderProgressOpen(false)} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import MenuGrid from '../components/MenuGrid';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';

function MenuPage({ theme, toggleTheme }) {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('/products');
        setCategories(res.data.categories);
        setMenuItems(res.data.menuItems);
      } catch (err) {
        console.error("Error fetching menu", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const { clearCart } = useCart();
  const navigate = useNavigate();
  
  const handlePlaceOrder = async (cartItems, total, paymentStatus) => {
    try {
      await axios.post('/orders', {
        items: cartItems,
        totalPrice: total,
        paymentStatus
      });
      clearCart();
      setIsCheckoutOpen(false);
      navigate('/orders');
    } catch (err) {
      alert("Please login to place an order");
      setIsCheckoutOpen(false);
    }
  };

  return (
    <>
      <div className="app-container">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <main className="main-content">
          <section className="hero">
            <h1 className="animate-slide-up">NO WAIT. JUST FOOD.</h1>
            <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Select your fuel. Pick it up. Don't waste time in lines.
            </p>
          </section>

          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading menu...</div>
          ) : (
            <>
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
            </>
          )}
        </main>

        <CartSidebar onCheckout={() => setIsCheckoutOpen(true)} />
        
        {isCheckoutOpen && (
          <CheckoutModal 
            onClose={() => setIsCheckoutOpen(false)} 
            onConfirm={handlePlaceOrder} 
          />
        )}
      </div>
    </>
  );
}

export default MenuPage;

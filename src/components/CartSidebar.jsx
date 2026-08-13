import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import './Cart.css';

const CartSidebar = ({ onCheckout }) => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay animate-fade-in" onClick={() => setIsCartOpen(false)} />
      <div className="cart-sidebar animate-slide-left">
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="btn-icon" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} color="var(--text-secondary)" />
              <p>Your cart is empty.</p>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)}>
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    {item.customOptions?.length > 0 && (
                      <p className="cart-item-options">{item.customOptions.join(', ')}</p>
                    )}
                    <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-control small">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)}>+</button>
                      </div>
                      <button className="btn-remove" onClick={() => removeFromCart(item.cartItemId)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="btn-primary btn-full" 
              onClick={() => { setIsCartOpen(false); onCheckout(); }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

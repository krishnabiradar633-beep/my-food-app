import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Clock, CreditCard } from 'lucide-react';
import './Checkout.css';

const CheckoutModal = ({ onClose, onConfirm }) => {
  const { getCartTotal, cart } = useCart();
  const [pickupSlot, setPickupSlot] = useState('ASAP');
  
  const total = (getCartTotal() * 1.08).toFixed(2);

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content checkout-modal animate-slide-up">
        <div className="modal-header">
          <h2>Complete Your Order</h2>
          <button className="modal-close-static" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="checkout-body">
          <div className="checkout-section">
            <h3><Clock size={18}/> Pickup Time</h3>
            <select 
              className="pickup-select"
              value={pickupSlot}
              onChange={(e) => setPickupSlot(e.target.value)}
            >
              <option value="ASAP">ASAP (10-15 min)</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="12:30 PM">12:30 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="1:30 PM">1:30 PM</option>
            </select>
          </div>

          <div className="checkout-section">
            <h3><CreditCard size={18}/> Payment Details</h3>
            <div className="mock-payment">
              <input type="text" placeholder="Card Number" className="input-field" disabled value="•••• •••• •••• 4242" />
              <div className="input-row">
                <input type="text" placeholder="MM/YY" className="input-field half" disabled value="12/25" />
                <input type="text" placeholder="CVC" className="input-field half" disabled value="123" />
              </div>
              <p className="payment-note">* This is a static demo. No real payment required.</p>
            </div>
          </div>

          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <ul className="summary-list">
              {cart.map(item => (
                <li key={item.cartItemId}>
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="summary-total">
              <span>Total to pay</span>
              <span>${total}</span>
            </div>
          </div>
        </div>

        <div className="checkout-footer">
          <button className="btn-primary btn-full" onClick={() => onConfirm(cart, total, 'Paid')}>
            Place Order • ${total}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, ChefHat, Car, PartyPopper } from 'lucide-react';
import './Checkout.css';

const steps = [
  { id: 1, text: 'Order Received', icon: CheckCircle2 },
  { id: 2, text: 'Preparing Food', icon: ChefHat },
  { id: 3, text: 'Ready for Pickup', icon: Car },
];

const OrderProgress = ({ onClose }) => {
  const { clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Clear cart right when order is placed
    clearCart();

    const timer1 = setTimeout(() => setCurrentStep(2), 2000);
    const timer2 = setTimeout(() => setCurrentStep(3), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content progress-modal animate-slide-up">
        <div className="progress-header">
          {currentStep === 3 ? (
            <div className="success-icon animate-pulse"><PartyPopper size={48} color="var(--accent-color)" /></div>
          ) : (
            <div className="spinner"></div>
          )}
          <h2>{currentStep === 3 ? "Your order is ready!" : "Processing Order"}</h2>
          <p className="order-number">Order #A-892</p>
        </div>

        <div className="progress-timeline">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className={`timeline-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-icon-wrapper">
                  <Icon size={24} />
                </div>
                <div className="step-text">{step.text}</div>
                {idx < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            );
          })}
        </div>

        {currentStep === 3 && (
          <button className="btn-primary btn-full mt-4" onClick={onClose}>
            Back to Menu
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderProgress;

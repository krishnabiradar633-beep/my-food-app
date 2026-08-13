import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header';
import { RefreshCcw } from 'lucide-react';

function OrderTracker({ theme, toggleTheme }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/my-orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll for status updates every 10 seconds
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#f59e0b';
      case 'Preparing': return '#3b82f6';
      case 'Ready': return '#10b981';
      case 'Completed': return '#6b7280';
      case 'Cancelled': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} hideSearch={true} />
      
      <main className="main-content" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1>My Orders</h1>
          <button className="btn-icon" onClick={fetchOrders} title="Refresh">
            <RefreshCcw size={20} />
          </button>
        </div>
        
        {loading && orders.length === 0 ? (
          <p>Loading your orders...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.length === 0 ? (
              <p>You haven't placed any orders yet.</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="food-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', width: '100%', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h2>Order #{order.id}</h2>
                      <p style={{ color: 'var(--text-secondary)' }}>Placed on: {new Date(order.created_at).toLocaleString()}</p>
                      <h3 style={{ marginTop: '0.5rem', color: getStatusColor(order.status) }}>
                        Status: {order.status}
                      </h3>
                      <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Total: ${order.total_price.toFixed(2)}</p>
                    </div>
                    
                    {(order.status === 'Ready' || order.status === 'Preparing' || order.status === 'Pending') && (
                      <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
                        <QRCodeSVG value={JSON.stringify({ orderId: order.id, status: order.status })} size={120} />
                        <p style={{ textAlign: 'center', color: '#000', fontSize: '0.8rem', marginTop: '0.5rem' }}>Show this at pickup</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4>Order Items:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                      {order.items.map(item => (
                        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-color)', padding: '0.5rem', borderRadius: '8px' }}>
                          <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</p>
                          </div>
                          <p>${(item.price_at_time * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default OrderTracker;

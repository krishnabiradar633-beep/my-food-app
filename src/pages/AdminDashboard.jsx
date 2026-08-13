import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { RefreshCcw, TrendingUp, PackageSearch, ClipboardList, Plus } from 'lucide-react';

function AdminDashboard({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState('orders'); // orders, menu, analytics
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  // New product form state
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: 'burgers', stock_count: 100 });
  const [imageFile, setImageFile] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders');
      setOrders(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data.menuItems);
    } catch (err) { console.error(err); }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get('/orders/analytics');
      setAnalytics(res.data);
    } catch (err) { console.error(err); }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchProducts(), fetchAnalytics()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}/status`, { status });
      fetchOrders();
      fetchAnalytics();
    } catch (err) { console.error(err); }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => formData.append(key, newProduct[key]));
    if (imageFile) formData.append('imageFile', imageFile);
    
    try {
      await axios.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', category: 'burgers', stock_count: 100 });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const renderTabs = () => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
      <button 
        onClick={() => setActiveTab('orders')} 
        style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: activeTab === 'orders' ? 'var(--accent-color)' : 'var(--bg-color)', color: activeTab === 'orders' ? '#fff' : 'var(--text-primary)'
        }}
      >
        <ClipboardList size={18} /> Orders
      </button>
      <button 
        onClick={() => setActiveTab('menu')} 
        style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: activeTab === 'menu' ? 'var(--accent-color)' : 'var(--bg-color)', color: activeTab === 'menu' ? '#fff' : 'var(--text-primary)'
        }}
      >
        <PackageSearch size={18} /> Menu Management
      </button>
      <button 
        onClick={() => setActiveTab('analytics')} 
        style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: activeTab === 'analytics' ? 'var(--accent-color)' : 'var(--bg-color)', color: activeTab === 'analytics' ? '#fff' : 'var(--text-primary)'
        }}
      >
        <TrendingUp size={18} /> Analytics
      </button>
    </div>
  );

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} hideSearch={true} />
      
      <main className="main-content" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1>Admin Dashboard</h1>
          <button className="btn-icon" onClick={loadData} title="Refresh Data">
            <RefreshCcw size={20} />
          </button>
        </div>

        {renderTabs()}
        
        {loading ? (
          <p>Loading dashboard data...</p>
        ) : (
          <div style={{ paddingBottom: '4rem' }}>
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.length === 0 ? <p>No orders yet.</p> : orders.map(order => (
                  <div key={order.id} className="food-card" style={{ display: 'block', padding: '1.5rem', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Customer: {order.user_name} ({order.user_email})</p>
                        <p style={{ color: 'var(--text-secondary)' }}>Time: {new Date(order.created_at).toLocaleString()}</p>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Total: ${order.total_price.toFixed(2)}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Status:</span>
                        <select 
                          value={order.status} 
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{ padding: '0.8rem', borderRadius: '8px', background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 'bold' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ marginBottom: '0.5rem' }}>Items:</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {order.items.map(item => (
                          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', padding: '0.5rem 0' }}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price_at_time * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MENU MANAGEMENT TAB */}
            {activeTab === 'menu' && (
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div className="food-card" style={{ flex: '1 1 300px', padding: '1.5rem', display: 'block' }}>
                  <h3><Plus size={18} style={{ verticalAlign: 'middle' }}/> Add New Item</h3>
                  <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                    <input type="number" step="0.01" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
                      <option value="burgers">Burgers</option>
                      <option value="sides">Sides</option>
                      <option value="drinks">Drinks</option>
                      <option value="desserts">Desserts</option>
                    </select>
                    <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} rows="3" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                    <input type="number" placeholder="Stock Count" value={newProduct.stock_count} onChange={e => setNewProduct({...newProduct, stock_count: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Upload Image (Optional)</label>
                      <input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
                    </div>
                    <button type="submit" className="add-to-cart-btn">Add Product</button>
                  </form>
                </div>
                
                <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3>Current Menu Items</h3>
                  {products.map(p => (
                    <div key={p.id} className="food-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <p style={{ fontWeight: 'bold' }}>{p.name}</p>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Stock: {p.stock_count} | ${p.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === 'analytics' && analytics && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div className="food-card" style={{ flex: '1', padding: '2rem', textAlign: 'center', display: 'block' }}>
                    <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Revenue</h2>
                    <h1 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>${analytics.totalRevenue.toFixed(2)}</h1>
                  </div>
                  <div className="food-card" style={{ flex: '1', padding: '2rem', textAlign: 'center', display: 'block' }}>
                    <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Orders</h2>
                    <h1 style={{ fontSize: '3rem' }}>{analytics.totalOrders}</h1>
                  </div>
                </div>

                <div className="food-card" style={{ padding: '2rem', display: 'block' }}>
                  <h3 style={{ marginBottom: '1.5rem' }}>Order Status Breakdown</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(analytics.statusCounts).map(([status, count]) => {
                      const total = analytics.totalOrders || 1;
                      const percentage = Math.round((count / total) * 100);
                      
                      let barColor = 'var(--accent-color)';
                      if (status === 'Completed') barColor = '#6b7280';
                      if (status === 'Ready') barColor = '#10b981';
                      if (status === 'Preparing') barColor = '#3b82f6';
                      if (status === 'Pending') barColor = '#f59e0b';
                      if (status === 'Cancelled') barColor = '#ef4444';

                      return (
                        <div key={status}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>{status} ({count})</span>
                            <span>{percentage}%</span>
                          </div>
                          <div style={{ width: '100%', height: '12px', background: 'var(--bg-color)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ width: `${percentage}%`, height: '100%', background: barColor, borderRadius: '6px' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;

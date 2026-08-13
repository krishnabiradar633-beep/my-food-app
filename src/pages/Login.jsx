import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Login({ theme, toggleTheme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const user = await login(email, password);
        if (user.role === 'admin') navigate('/admin');
        else navigate('/');
      } else {
        await register(name, email, password);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} hideSearch={true} />
      
      <main className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="food-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            {isLogin ? 'Login to QuickBite' : 'Create an Account'}
          </h2>
          
          {error && <div style={{ color: '#FF416C', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)' }}
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)' }}
            />
            <button type="submit" className="add-to-cart-btn" style={{ marginTop: '1rem' }}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isLogin ? 'Sign up here' : 'Log in here'}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;

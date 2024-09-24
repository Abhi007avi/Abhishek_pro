import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // Assuming username = email
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store token in local storage
        localStorage.setItem('token', data.token);

        // Call onLogin with user data
        onLogin(data.user);
      } else {
        setError(data.message); // Handle login error (e.g., invalid credentials)
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
        <p className="signup-link">Sign Up</p>
      </div>
    </div>
  );
};

export default LoginPage;

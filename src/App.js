import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login logic
  const handleLogin = (email, password) => {
    // Replace with your actual login logic (fetch from server and verify credentials)
    console.log('Email:', email, 'Password:', password);
    
    // Assuming login is successful, store token in localStorage
    localStorage.setItem('token', 'your-jwt-token'); // Replace 'your-jwt-token' with the actual token from the server
    
    setIsLoggedIn(true);
  };

  // Function to handle logout logic
  const handleLogout = () => {
    // Clear the token from localStorage and update the login state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} /> // Pass the logout handler to the dashboard
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
    
  );
}

export default App;

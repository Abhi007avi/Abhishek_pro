import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './Dashboard';
import ViewDocument from './ViewDocument';
import LoginPage from './LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  // Function to handle login logic
  const handleLogin = (email, password) => {
    // Add actual login logic here, for now, we'll just log the user in directly
    console.log('Email:', email, 'Password:', password);
    
    // Assuming login is successful
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

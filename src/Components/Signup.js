import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
const Signup = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    // Retrieve existing user data from local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    // Check if username already exists
    if (existingUsers[username]) {
      alert('Username already exists. Please choose a different one.');
      return;
    }
    // Add new user data to existing users
    existingUsers[username] = password;
    // Update local storage with new user data
    localStorage.setItem('users', JSON.stringify(existingUsers));
    // Set logged in state to true
    setLoggedIn(true);
    // Navigate to home page
    navigate('/');
  };

  // const handleClearLocalStorage = () => {
  //   localStorage.clear();
  //   alert('Local Storage is Cleared successfully');
  // };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='main'>
    <div className='signup-box'>
      <h2 className='signup-text'>Sign Up</h2>
      <input
      className='signup-input'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <div className='password-container'>
        <input
          className='signup-input password-input'
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='password-toggle'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <br />
      <button onClick={handleSignup}  className='signup-button'>Sign Up</button>
      {/* <button onClick={handleClearLocalStorage}>Clear Local Storage</button> */}
      <p onClick={handleBackToLogin}className='back-to-login'>Back to login</p>
    </div>
    </div>
  );
};

export default Signup;
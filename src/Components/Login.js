import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (existingUsers[username]) {
      if (existingUsers[username] === password) {
        localStorage.setItem('loggedInUser', username);
        setLoggedIn(true);
        navigate('/home');
      } else {
        alert('Incorrect password');
      }
    } else {
      alert('Username does not exist');
    }
  };

  return (
    <div className='main1'>
    <div className='login-box'>
      <h2 className='login-text'>Login</h2>
      <input
      className='login-input'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <div className='password-container'>
        <input
          className='login-input password-input'
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
      <button onClick={handleLogin} className='login-button'>Login</button>
      <button onClick={handleSignupClick} className='sign-button'> Don't have an account? <u>Signup</u></button>
    </div>
  </div>
  );
};

export default Login;
// Header.js
import React from 'react';

const Header = ({ loggedInUser, handleToggleDarkMode }) => {
  return (
    <div className='header'>
      {loggedInUser && (
        <h1>Welcome, {loggedInUser}!</h1>
      )}
      <button
        onClick={() =>
          handleToggleDarkMode((previousDarkMode) => !previousDarkMode)
        }
        className='toggle'
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Pages/Home';
import ImageComponent from './Components/ImageComponent';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageComponent />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
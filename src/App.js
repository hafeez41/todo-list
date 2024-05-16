// src/App.js
import React, { useState } from 'react';
import Home from './pages/Home';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Home toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default App;

import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserLogin from './Components/UserLogin/UserLogin';
import Background from './Components/Background/Background';

function App() {
  return (
    <Router>
      <div className="App">
        <Background />
        <Routes>
          <Route path="/" element={<UserLogin />} />
          {/* <Route path="/weatherstation" element={<WeatherStation />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import HomePage from './Components//HomePage/HomePage.js'
import LoginForm from './Components/UserLogin/LoginForm/LoginForm.js';
import './App.css';
import SignupForm from './Components/UserLogin/LoginForm/SignForm.js'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<SignupForm />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

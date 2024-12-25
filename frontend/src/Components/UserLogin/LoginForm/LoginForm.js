import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './LoginForm.css';
import Background from '../../Background/Background';
import Input from './Inputs/Input';
import Button from './Buttons/Button';
import authService from 'frontend/src/services/authService.js'



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(username, password);
      console.log('Login successful:', data);  // Log the successful response
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error);
      alert(`Failed to login: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  

  return (
    <div className="login-form-container">
        <Background/>
      <form onSubmit={handleSubmit} className='form-login'>
      <h2>Login In</h2>

        <div>
          <label htmlFor="username">Username:</label>
          <Input
            type="text"
            placeholder='Username...'
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Input
            type="password"
            id="password"
            placeholder='Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button 
        color="black" 
        buttonText="Login" />
        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

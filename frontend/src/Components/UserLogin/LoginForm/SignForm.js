import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './LoginForm.css';
import Background from '../../Background/Background';
import Input from './Inputs/Input';
import Button from './Buttons/Button';
import authService from 'frontend/src/services/authService.js'



const SignForm= () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, password);
      alert('Registration successful');
      navigate('/home'); 
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (
    <div className="login-form-container">
        <Background/>
      <form onSubmit={handleSubmit} className='form-login'>
      <h2>Sign Up</h2>

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
        buttonText="Sign up" />
                <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignForm;

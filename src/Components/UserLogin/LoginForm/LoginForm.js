import React, { useState } from 'react';
import Input from './Inputs/Input';  
import Button from './Buttons/Button';         
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <Input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    style={{ marginBottom: '10px' }}
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    style={{ marginBottom: '20px' }}
                />
                <br></br>
                <Button buttonText="Login" color="#3498db" />
            </form>
            <p className="create-account">
                Don’t have an account? <a href="/signup">Create Account</a>
            </p>
        </div>
    );
};

export default LoginForm;

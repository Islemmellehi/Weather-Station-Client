import React from 'react';
import './Input.css';

const Input = ({ 
    placeholder = "Enter text", 
    value, 
    onChange, 
    type = "text", 
    style 
}) => {
    return (
        <input 
            className="custom-input" 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={onChange} 
            style={style} 
        />
    );
};

export default Input;

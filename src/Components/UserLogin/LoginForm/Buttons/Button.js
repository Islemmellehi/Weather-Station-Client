import React from 'react';
import './Button.css';

const Button = ({ buttonText, color }) => {
    return (
        <button 
            className="custom-button" 
            style={{ backgroundColor: color }}
        >
            {buttonText}
        </button>
    );
};

export default Button;

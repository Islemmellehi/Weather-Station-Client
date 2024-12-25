import React from 'react';
import './Button.css';

const Button = ({ buttonText, color, onClick }) => { // Add onClick to props
    return (
        <button 
            className="custom-button" 
            style={{ backgroundColor: color }}
            onClick={onClick} // Attach onClick to button
        >
            {buttonText}
        </button>
    );
};

export default Button;

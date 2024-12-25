import React from 'react';

const iconComponent = ({ imageSrc, alt = 'icon' }) => {
  return (
    <img
      src={imageSrc}
      alt={alt}
      style={{
        width: '40px',
        height: '40px',
        display: 'block',
      }}
    />
  );
};

export default iconComponent;

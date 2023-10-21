import React from 'react';
import '../style/components/button.css';

const Button = ({ textColor, bgColor, borderColor, children, onClick }) => {
  const buttonStyle = {
    '--text-color': textColor ,
    '--bg-color': bgColor ,
    '--border-color': borderColor,
  };

  return (
    <button className="button" style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

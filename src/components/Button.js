import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../style/components/button.css';

const Button = ({ textColor, bgColor, borderColor, children, onClick }) => {
  const buttonStyle = {
    '--text-color': textColor,
    '--bg-color': bgColor,
    '--border-color': borderColor,
  };

  return (
    <button className="button" style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  textColor: PropTypes.string, // Validate textColor as a string
  bgColor: PropTypes.string,   // Validate bgColor as a string
  borderColor: PropTypes.string, // Validate borderColor as a string
  children: PropTypes.node,   // Validate children as a React node
  onClick: PropTypes.func,    // Validate onClick as a function
};

export default Button;

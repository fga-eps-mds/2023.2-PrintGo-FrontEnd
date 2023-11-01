import React from 'react';
import PropTypes from 'prop-types';
import '../style/components/input.css';

function Input(props) {
  return (
    <div className="Input">
      {props?.label && <label> {props?.label} </label>}
      
      <input placeholder={props?.placeholder} className={props?.className} onChange={props?.onChange} />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;

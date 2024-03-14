import React from 'react';
import './CustomSwitch.css'; 

const CustomSwitch = ({ checked, onChange }) => {

  const uniqueId = `custom-switch-${Math.random().toString(36).substr(2, 9)}`;

  // HTML to React adjustments
  const thumbStyle = checked
    ? { left: 'calc(100% - calc(var(--sz) * 2))' }
    : {};


  return (
    <div className="toggle">
      <input
        type="checkbox"
        id={uniqueId}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={uniqueId}>
        <span className="thumb" style={thumbStyle}></span>{' '}
      </label>
      <div className="light"></div>
    </div>
  );
};

export default CustomSwitch;

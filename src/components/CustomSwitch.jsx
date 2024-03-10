import React from 'react';
import './CustomSwitch.css'; 

const CustomSwitch = ({ checked, onChange }) => {

  const uniqueId = `custom-switch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="toggle">
      <input
        type="checkbox"
        id={uniqueId}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={uniqueId}>
        <span className="thumb"></span>
      </label>
      <div className="light"></div>
    </div>
  );
};

export default CustomSwitch;

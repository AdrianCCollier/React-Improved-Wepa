import React from 'react'
import './CustomSwitch.css'

const CustomSwitch = ({ checked, onChange, id }) => (
  <div className="toggle">
    <input type="checkbox" id={id} checked={checked} onChange={onChange} />
    <label htmlFor={id}>
      <span className="thumb"></span>
    </label>
    <div className="light"></div>
  </div>
);

export default CustomSwitch
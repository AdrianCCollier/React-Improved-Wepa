import React from 'react';
import { Button } from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar'; 


const buttonStyles = {
  borderRadius: '20px', 
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', 
  transition:
    'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease', 
  '&:hover': {
    background: 'linear-gradient(45deg, #21A1F3 30%, #21CBE3 90%)', 
    transform: 'scale(1.05)', 
    boxShadow: '0 5px 15px 2px rgba(33, 153, 243, .4)', 
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    border: '2px solid transparent',
    borderRadius: 'inherit', 
    transition: 'border-color 0.3s',
  },
  '&:hover:before': {
    borderColor: '#21CBF3', 
  },
};

const BeginButton = ({ onBegin }) => {
  return (
    <Button onClick={onBegin} sx={buttonStyles} startIcon={<RadarIcon />}>
      Begin Monitoring
    </Button>
  );
};

export default BeginButton;

import React from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)( () => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#007FFF',
  },
  '& .MuiSwitch-switchBase': {
    color: '#767676',
    '&:hover': {
      backgroundColor: 'rgba(118, 118, 118, 0.1)',
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#bdbdbd',
  },
}));

export default CustomSwitch;

import React, { useState } from 'react';
import { Box, Switch, FormControlLabel, FormGroup, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';


const LocationBox = () => {
  const [locations, setLocations] = useState({
    all: true,
    corbett: false,
    hjlc: false,
    bc309: false,
  });

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    if(name === 'all') {
      setLocations({
        all: true,
        corbett: false,
        hjlc: false,
        bc309: false,
      });
    } else {
      setLocations((prevLocations) => ({
        ...prevLocations,
        all: false,
        [name]: checked,
      }));
    }
  };

  return (
    <Box
      gridColumn="span 3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border="solid 5px red"
      borderRadius="5px"
      p={2} // Padding for internal space
    >
    <Typography variant='h6' color='textPrimary' gutterBottom>
      Lab Locations
    </Typography>
    </Box>
  )
} // end Component

export default LocationBox;
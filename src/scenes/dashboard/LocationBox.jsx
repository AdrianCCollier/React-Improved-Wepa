import React, { useState } from 'react';
import {
  Box,
  Switch,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';

const LocationBox = ({ colors }) => {
  const [locations, setLocations] = useState({
    all: true,
    corbett: false,
    hjlc: false,
    bc309: false,
  });

  const handleToggle = (event) => {
    const { name, checked } = event.target;
    if (name === 'all') {
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
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="5px"
      width="100%"
      p={2}
      minHeight="200px"
    >
      <ComputerIcon
        sx={{ color: colors.greenAccent[600], fontSize: '26px', mb: 2 }}
      />
      <FormGroup>
        {Object.keys(locations).map((location) => (
          <FormControlLabel
            key={location}
            control={
              <Switch
                checked={locations[location]}
                onChange={handleToggle}
                name={location}
              />
            }
            label={location.charAt(0).toUpperCase() + location.slice(1)}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default LocationBox;

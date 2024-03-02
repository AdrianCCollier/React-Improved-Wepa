import React, { useState } from 'react'
import {
  Box,
  Switch,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer'

const LocationBox = ({ colors }) => {
  const [locations, setLocations] = useState({
    all: true,
    corbett: false,
    hjlc: false,
    bc309: false,
  })

  const handleToggle = (event) => {
    const { name, checked } = event.target
    if (name === 'all') {
      setLocations({
        all: true,
        corbett: false,
        hjlc: false,
        bc309: false,
      })
    } else {
      setLocations((prevLocations) => ({
        ...prevLocations,
        all: false,
        [name]: checked,
      }))
    }
  }
  return (
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // border="solid 5px red"
      borderRadius="5px"
      p={2} // Padding for internal spacing
    >
      {/* Box for Title and Icon together */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {/* Container Box for Title, to align Text and Icon on the same row */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {/* <Typography
            variant="h6"
            color="textPrimary"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}
          >
            Lab Locations
          </Typography> */}
        </Box>
        {/* Icon aligned with Title */}
        <ComputerIcon
          sx={{ color: colors.greenAccent[600], fontSize: '26px', mt: 1 }}
        />
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={locations.all}
              onChange={handleToggle}
              name="all"
            />
          }
          label="All"
        />
        <FormControlLabel
          control={
            <Switch
              checked={locations.corbett}
              onChange={handleToggle}
              name="corbett"
            />
          }
          label="Corbett"
        />
        <FormControlLabel
          control={
            <Switch
              checked={locations.hjlc}
              onChange={handleToggle}
              name="hjlc"
            />
          }
          label="HJLC"
        />
        <FormControlLabel
          control={
            <Switch
              checked={locations.bc309}
              onChange={handleToggle}
              name="bc309"
            />
          }
          label="BC309"
        />
      </FormGroup>
    </Box>
  )


} // end Component

export default LocationBox

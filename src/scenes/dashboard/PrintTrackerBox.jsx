import React from 'react'
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'

const PrintTrackerBox = ( {colors}) => {
  const locations = [
    { name: 'HJLC', jobs: 0 },
    { name: 'Zuhl', jobs: 0 },
    { name: 'Corbett Center', jobs: 0 },
    { name: "Pete's Place", jobs: 0 },
    { name: 'BC 309', jobs: 0 },
  ]

  return (
    <Box
      gridColumn="span 3"
      display="flex"
      border="solid 5px red"
      flexDirection="column"
      alignItems="center"
      backgroundColor={colors.primary[400]}
      justifyContent="center"
      p={2}
      borderRadius="5px"
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.25rem',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Daily Print Tracker
      </Typography>
      <List sx={{ width: '100%' }}>
        {locations.map((location, index) => (
          <ListItem key={index} sx={{ justifyContent: 'space-between' }}>
            <ListItemText primary={location.name} />
            <Typography sx={{ fontWeight: 'bold' }}>{location.jobs}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default PrintTrackerBox;

import React from 'react'
import { Box, Typography } from '@mui/material'


const SettingsUI = ( {colors} ) => {

  return (
    <Box
      gridColumn="span 3"
      display="flex"
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
        Settings
      </Typography>
    
    </Box>
  )
}

export default SettingsUI
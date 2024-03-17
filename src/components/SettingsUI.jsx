import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Slider,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useSound } from '../scenes/dashboard/SoundContext';

const SettingsUI = ({ colors, toggleTable }) => {
  const { playSound, setSoundVolume, volume } = useSound();
  const [value, setValue] = React.useState(volume * 100);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSoundVolume(newValue / 100);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTestSoundClick = () => {
    console.log('Testing Sound');
    playSound();
  };

  return (
    <Box
      gridColumn='span 3'
      display='flex'
      backgroundColor={colors.primary[400]}
      // border="solid 5px red"
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={2}
      borderRadius='5px'
      width='100%'
      minHeight='200px'
    >
      <Grid container spacing={2} justifyContent='center'>
        {' '}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant='contained'
            fullWidth
            onClick={toggleTable}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1769aa',
              },
            }}
          >
            Toggle Table
          </Button>
        </Grid>
        {/* Use Grid container here */}
        {/* Test Sound Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant='contained'
            fullWidth
            onClick={handleTestSoundClick}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1769aa',
              },
            }}
          >
            Test Sound
          </Button>
        </Grid>
        {/* Select Sound Dropdown Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant='contained'
            fullWidth // Make button expand to fill the grid item
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1769aa',
              },
            }}
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Select Sound
          </Button>
        </Grid>
        {/* Toggle Table Button */}
        {/* Volume Slider */}
        <Grid item xs={12} md={6}>
          {' '}
          {/* Adjust grid sizing based on your preference */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VolumeDown />
            <Slider
              aria-label='Volume'
              value={value}
              onChange={handleChange}
              sx={{ mx: 2, width: '80%' }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'select-sound',
        }}
      >
        <MenuItem onClick={handleClose}>Sound 1</MenuItem>
        <MenuItem onClick={handleClose}>Sound 2</MenuItem>
        <MenuItem onClick={handleClose}>Sound 3</MenuItem>
        <MenuItem onClick={handleClose}>More Sounds</MenuItem>
      </Menu>
    </Box>
  );
};

export default SettingsUI;

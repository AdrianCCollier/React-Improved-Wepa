import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Menu,
  MenuItem,
  Slider,
} from '@mui/material';

import { useSound } from '../scenes/dashboard/SoundContext';
import { sounds, soundOptions } from '../sounds/index';
import BeginButton from '../scenes/dashboard/BeginButton';
import CountdownTimer from '../scenes/dashboard/CountdownTimer';
import VolumeDown from '@mui/icons-material/VolumeDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SettingsUI = ({
  onCountdownComplete,
  colors,
  toggleTable,
  startCountdown,
}) => {
  const { playSound, setSoundVolume, volume, setCurrentSound } = useSound();

  const [value, setValue] = React.useState(volume * 100);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVolumeChange = (event, newValue) => {
    setValue(newValue);
    setSoundVolume(newValue / 100);
  };

  const handleSoundChange = (soundKey) => {
    setCurrentSound(soundKey);
    handleClose();
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
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={2}
      borderRadius='5px'
      width='100%'
      minHeight='200px'
    >
      <Grid
        container
        spacing={2}
        alignItems='flex-start'
        justifyContent='flex-start'
      >
        <Grid item xs={12}>
          <Box display='flex' alignItems='center'>
            <CountdownTimer
              onCountdownComplete={onCountdownComplete}
              startCountdown={startCountdown}
            />
            <Typography variant='body2' sx={{ ml: 2 }}></Typography>
          </Box>
        </Grid>

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

        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant='contained'
            fullWidth
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1769aa',
              },
              marginBottom: 2,
            }}
          >
            Select Sound
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {soundOptions.map((option) => (
              <MenuItem
                key={option.key}
                onClick={() => handleSoundChange(option.key)}
              >
                {option.displayName}
              </MenuItem>
            ))}
          </Menu>
        </Grid>

        <Grid item xs={12} md={6}>
          {' '}
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
              onChange={handleVolumeChange}
              sx={{ mx: 2, width: '80%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsUI;

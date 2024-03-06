import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Slider,
  Menu,
  MenuItem,
  Grid, // Import Grid
} from '@mui/material';
import VolumeDown from '@mui/icons-material/VolumeDown';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SettingsUI = ({ colors }) => {
  const [value, setValue] = React.useState(30);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      gridColumn="span 3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
      borderRadius="5px"
      width="100%" // Ensure the Box takes full width
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          fontSize: '1.75rem',
          mb: 2,
          textAlign: 'center',
          width: '100%', // Ensure Typography takes full width for proper alignment
        }}
      >
        Settings
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {' '}
        {/* Use Grid container here */}
        {/* Test Sound Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth // Make button expand to fill the grid item
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
            variant="contained"
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
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth // Make button expand to fill the grid item
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
              aria-label="Volume"
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

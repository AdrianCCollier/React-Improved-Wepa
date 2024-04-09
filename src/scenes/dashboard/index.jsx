import React, { useState, useEffect } from 'react';
import { Box, Modal, useTheme, Grid } from '@mui/material';

import { tokens } from '../../theme';
import Header from '../../components/Header';
import { SoundProvider } from './SoundContext';
import BeginButton from './BeginButton';

import CountdownTimer from './CountdownTimer';
import WepaTable from './WepaTable';
import LocationBox from './LocationBox';
import PrintTrackerBox from './PrintTrackerBox';
import SettingsUI from '../../components/SettingsUI';
import BirthdayTracker from '../../components/BirthdayTracker';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Countdown timer hitting 0 logic
  const [shouldFetchPrinters, setShouldFetchPrinters] = useState(false);

  const handleCountdownComplete = () => {
    setShouldFetchPrinters(true);
  };


  const [userPermission, setUserPermission] = useState(false);

  const [isTableMinimized, setIsTableMinimized] = useState(true);
  const [printerData, setPrinterData] = useState([]);



  const beginMonitoring = () => {
    console.log('Monitoring has started');
    setUserPermission(true);
  };

  const toggleTable = () => {
    setIsTableMinimized(!isTableMinimized);
  };

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('/printers');
        if (!response.ok)
          throw new Error(`HTTP error, status: ${response.status}`);
        const printers = await response.json();
        setPrinterData(printers);
      } catch (error) {
        console.error('Failed to fetch printers: ', error);
      }
    };

    fetchPrinters();
  }, []);

  const boxStyle = {
    borderRadius: '5px',
    backgroundColor: colors.primary[400],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    width: '100%',
    minHeight: '200px',
    maxHeight: '500px',
  };

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, 
  bgcolor: 'background.paper',
  boxShadow: '0px 7px 30px rgba(0, 0, 0, 0.2)',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  outline: 'none', 

};

  return (
    <SoundProvider>
      <Modal
        open={!userPermission}
        onClose={() => setUserPermission(true)}
        aria-labelledby='monitoring-modal-title'
        aria-describedby='monitoring-modal-description'
        closeAfterTransition

      >
        <Box sx={modalStyle}>
          <BeginButton onBegin={beginMonitoring} />
        </Box>
      </Modal>

      <Box m='20px' opacity={userPermission ? '100%' : '0%'}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Header title='NMSU Lab Crabs' subtitle='Automated Wepa App' />
        </Box>

        <Grid container spacing={2}>
          {/* First Row Boxes */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={boxStyle}>{/* <LocationBox colors={colors} /> */}</Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={boxStyle}>{/* <PrintTrackerBox colors={colors} /> */}</Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box sx={boxStyle}>{/* <BirthdayTracker /> */}</Box>
          </Grid>

          {/* This box remains as a placeholder or for future content */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={boxStyle}>{/* Future content */}</Box>
          </Grid>

          {/* Second Row Boxes */}
          {/* WepaTable taking up 3 spaces */}
          <Grid item xs={12} sm={8}>
            <Box sx={{ ...boxStyle, minHeight: 'auto' }}>
              {' '}
              {/* Adjust minHeight as needed for the table */}
              <WepaTable
                shouldFetchPrinters={shouldFetchPrinters}
                setShouldFetchPrinters={setShouldFetchPrinters}
                colors={colors}
                data={printerData}
                userPermission={userPermission}
                isMinimized={isTableMinimized}
              />
            </Box>
          </Grid>

          {/* SettingsUI taking up the final space */}
          <Grid item xs={12} sm={4}>
            <Box sx={boxStyle}>
              <SettingsUI
                onCountdownComplete={handleCountdownComplete}
                colors={colors}
                toggleTable={toggleTable}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </SoundProvider>
  );
};

export default Dashboard;

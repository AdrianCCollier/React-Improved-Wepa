import React, { useState, useEffect } from 'react';
import { Box, useTheme, Grid } from '@mui/material';

import { tokens } from '../../theme';
import Header from '../../components/Header';

import WepaTable from './WepaTable';
import LocationBox from './LocationBox';
import PrintTrackerBox from './PrintTrackerBox';
import SettingsUI from '../../components/SettingsUI';
import BirthdayTracker from '../../components/BirthdayTracker';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [printerData, setPrinterData] = useState([]);

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

  const boxSx = {
    borderRadius: '5px',
    backgroundColor: colors.primary[400],
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 2,
    height: '100%', 
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Header title="NMSU Lab Crabs" subtitle="Automated Wepa App" />
      </Box>

      {/* GRID & CHARTS */}
      <Grid
        container
        spacing={2}
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="auto" // Adjusted to auto for dynamic height
      >
        {/* Combined LocationBox and SettingsUI */}
        <Grid item xs={12} sm={6} md={3}>
          <Box
            borderRadius="5px"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <LocationBox colors={colors} />
            <SettingsUI colors={colors} />
          </Box>
        </Grid>

        {/* Daily Print Tracker Box */}
        <Grid item xs={12} sm={6} md={3}>
          <PrintTrackerBox colors={colors} />
        </Grid>

        {/* Birthday Tracker Box */}
        <Grid item xs={12} sm={6} md={3}>
          <BirthdayTracker />
        </Grid>

        {/* Empty Box */}
        <Grid item xs={12} sm={6} md={3}>
          <BirthdayTracker />
        </Grid>

        {/* WepaTable Full Width */}
        <Grid item xs={12}>
          <Box
            borderRadius="5px"
            backgroundColor={colors.primary[400]}
            p="20px"
          >
            <WepaTable data={printerData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
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
      <Box
        display="grid"
        //border="solid 5px red"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120"
        gap="20px"
      >
        {/* ROW 1 */}

        <LocationBox colors={colors}></LocationBox>

        {/* <Box
          gridColumn="span 3"
          
          alignItems="center"
          borderRadius="5px"
          border="solid 5px red"
        >
          <Typography>Aggie Prints Today:</Typography>
        </Box> */}
        <PrintTrackerBox colors={colors}></PrintTrackerBox>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        ></Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        ></Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          borderRadius="5px"
          backgroundColor={colors.primary[400]}
        >
          {/* WEPA TABLE HERE   */}

          {/* Passing back-end printer data as prop to child */}
          <WepaTable data={printerData}></WepaTable>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <SettingsUI colors={colors}></SettingsUI>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          // border="solid 5px red"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          {/* Birthday Tracker */}
          <BirthdayTracker></BirthdayTracker>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

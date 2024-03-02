import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'

import WepaTable from './WepaTable'
import LocationBox from './LocationBox'
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [printerData, setPrinterData] = useState([]);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await fetch('/printers');
        if(!response.ok) throw new Error(`HTTP error, status: ${response.status}`);
        const printers = await response.json();
        setPrinterData(printers);
      } catch (error) {
        console.error("Failed to fetch printers: ", error);
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
        // border="solid 5px red"
      >
        <Header title="NMSU Lab Crabs" subtitle="Automated Wepa App" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        //border="solid 5px red"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          border="solid 5px red"
          borderRadius="5px"
          justifyContent="center"
        >
          <StatBox
            title="Location"
            subtitle="HJLC Petes Place BC309"
            icon={
              <ComputerIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box> */}
        <LocationBox colors={colors}></LocationBox>


        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <Typography>Aggie Prints Today:</Typography>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <Typography>BC Prints Today:</Typography>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
        >
          <Typography>Petes Prints Today:</Typography>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          borderRadius="5px"
          backgroundColor={colors.primary[400]}
          // border="solid 5px red"
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
          // border="solid 5px red"
        >
          <Typography variant="h3" textAlign="center">
            Settings
          </Typography>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="5px"
          backgroundColor={colors.primary[400]}
          // border="solid 5px green"
          p="30px"
        >
          <Typography
            textAlign="center"
            // border="solid 5px red"
            variant="h5"
            fontWeight="600"
          >
            Birthday Tracker
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Typography
              variant="h5"
              // border="solid 5px yellow"
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            ></Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard

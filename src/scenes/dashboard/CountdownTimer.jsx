import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CountdownTimer = ( {onCountdownComplete}) => {
  const [progress, setProgress] = useState(100);
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          // Placeholder for API fetch logic later
          console.log('Fetching new data...');
          onCountdownComplete();
          return 180;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [onCountdownComplete]);

  useEffect(() => {
    setProgress((seconds / 180) * 100);
  }, [seconds]);

  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress
        variant='determinate'
        value={progress}
      ></CircularProgress>
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {`${Math.round(seconds)}s`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountdownTimer;

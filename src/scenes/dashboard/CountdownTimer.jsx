import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CountdownTimer = ({ onCountdownComplete }) => {
  const [progress, setProgress] = useState(100);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      onCountdownComplete(); // Trigger the completion action
      setSeconds(10); // Reset for next countdown, adjust as needed for your case
    }
    // This also updates the progress as the seconds change
    setProgress((seconds / 10) * 100); // Adjust the denominator as needed
  }, [seconds, onCountdownComplete]);

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
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {`${Math.round(seconds)}s`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountdownTimer;

import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CountdownTimer = ({ onCountdownComplete }) => {
  const [progress, setProgress] = useState(100);
  const [initialSeconds, setInitialSeconds] = useState(10);
  const [regularSeconds, setRegularSeconds] = useState(120);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isInitialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      onCountdownComplete();
      if (isInitialCheck) {
        setSeconds(regularSeconds);
        setInitialCheck(false);
      } else {
        setSeconds(regularSeconds);
      }
    }

    const currentTotalSeconds = isInitialCheck
      ? initialSeconds
      : regularSeconds;

    setProgress((seconds / currentTotalSeconds) * 100);
  }, [seconds, isInitialCheck, onCountdownComplete]);

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

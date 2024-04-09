import React, { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const CountdownTimer = ({ onCountdownComplete, startCountdown }) => {
  const [progress, setProgress] = useState(100);
  const [initialSeconds, setInitialSeconds] = useState(10);
  const [regularSeconds, setRegularSeconds] = useState(120);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isInitialCheck, setInitialCheck] = useState(true);
  const [fadeKey, setFadeKey] = useState(0);

  const getColor = (progress) => {
    if (progress > 66) return '#4caf50';
    if (progress > 33) return '#ffeb3b';
    return '#f44336';
  };

  useEffect(() => {
    if (!startCountdown) {
      return;
    }

      const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startCountdown]);

  useEffect(() => {
    if (seconds <= 0) {
      onCountdownComplete();
      if (isInitialCheck) {
        setSeconds(regularSeconds);
        setInitialCheck(false);
      } else {
        setSeconds(regularSeconds);
      }
    } else {
      setFadeKey((prevKey) => prevKey + 1);
    }

    const currentTotalSeconds = isInitialCheck
      ? initialSeconds
      : regularSeconds;

    setProgress((seconds / currentTotalSeconds) * 100);
  }, [
    seconds,
    isInitialCheck,
    initialSeconds,
    regularSeconds,
    onCountdownComplete,
  ]);

  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress
        variant='determinate'
        value={100 - progress}
        sx={{
          color: getColor(progress),
          animation: seconds <= 10 ? 'pulsate 1s ease infinite' : 'none',
          '@keyframes pulsate': {
            '0%, 100%': { transform: 'scale(1.0)' },
            '50%': { transform: 'scale(1.1)' },
          },
        }}
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
        <Typography
          key={fadeKey}
          variant='h6'
          component='div'
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            animation: seconds <= 10 ? 'fadeInOut 1s ease infinite' : 'none',
            '@keyframes fadeInOut': {
              '0%, 100%': { opacity: 0.2 },
              '50%': { opacity: 1 },
            },
          }}
        >
          {`${Math.round(seconds)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountdownTimer;

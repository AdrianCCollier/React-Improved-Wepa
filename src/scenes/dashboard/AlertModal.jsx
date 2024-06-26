import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  useTheme,
} from '@mui/material';

const AlertModal = ({
  open,
  message,
  location,
  statusMsg,
  printerText,
  printerSerial,
  onSnooze,
  onDisable,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onSnooze}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={onSnooze} color='primary' autoFocus>
          {/* Snooze (15 Mins) */}
          Ok
        </Button>

        <Button onClick={() => onDisable(printerSerial)} color='primary'>
          Turn Off This Alarm
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;

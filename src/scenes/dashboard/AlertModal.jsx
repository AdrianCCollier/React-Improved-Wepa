import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';

const AlertModal = ({ open, onSnooze, onDisable, colors }) => {
  return (
    <Dialog
      open={open}
      onClose={onSnooze}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: colors.primary[400],
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>
        {'A Wepa has gone down'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onSnooze} color='primary' autoFocus>
          Snooze (15 Mins)
        </Button>
        <Button onClick={onDisable} color='primary'>
          Turn Off Alarm 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;

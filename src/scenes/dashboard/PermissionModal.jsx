import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const PermissionModal = ({ open, onYes, onNo, colors }) => {
  return (
    <Dialog
      open={open}
      onClose={onNo}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: colors.primary[400],
        },
      }}
    >
      <DialogTitle id='alert-dialog-title'>
        {'Enable Sound Notifications?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onNo} color='primary'>
          No
        </Button>
        <Button onClick={onYes} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionModal;

import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
  Typography,
} from '@mui/material'
// import  ExpandMoreIcon  from '@mui/icons-material/ExpandMore'



const WepaTable = () => {
  const [isMinimized, setIsMinimized] = useState(true)

  // mockData as mutable
  const [data, setData] = useState([
    {
      location: 'Aggie, Left Kiosk',
      serial: '12345',
      status: 'Green',
      notify: false,
    },
    {
      location: 'Aggie, Right Kiosk',
      serial: '12346',
      status: 'Yellow',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Yellow',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
    {
      location: 'Library, Main Entrance',
      serial: '12347',
      status: 'Red',
      notify: false,
    },
  ])
  const handleExpandClick = () => {
    setIsMinimized(!isMinimized)
  }

  const handleToggleNotifications = (index) => {
    
    const newData = data.map((item, i) => {
      if(i === index) {
        return { ...item, notify: !item.notify }
      }
        return item;
    });
    console.log(newData);
    setData(newData);
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
      <IconButton onClick={handleExpandClick} aria-label="expand"></IconButton>
      <Table
        sx={{ minWidth: 200 }}
        size="small"
        aria-label="WEPA table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ py: 0, px: 1, fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              Location
            </TableCell>
            <TableCell
              sx={{ py: 0, px: 1, fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              Serial #
            </TableCell>
            <TableCell
              sx={{ py: 0, px: 1, fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{ py: 0, px: 1, fontSize: '0.875rem', fontWeight: 'bold' }}
            >
              Notifications
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data, index) => (
            <TableRow
              key={index}
              sx={{  '&:hover': { backgroundColor: 'action.selected', cursor: 'pointer'} }}
            >
              <TableCell sx={{ py: 0, px: 1, fontSize: '0.875rem' }}>
                <Typography variant="body2">{data.location}</Typography>
              </TableCell>
              <TableCell>{data.serial}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <Switch
                  checked={data.notify}
                  onChange={() => handleToggleNotifications(index)}
                ></Switch>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WepaTable

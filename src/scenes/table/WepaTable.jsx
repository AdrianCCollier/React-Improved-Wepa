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

// Mock data
const mockData = [
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
]

const WepaTable = () => {
  const [isMinimized, setIsMinimized] = useState(true)

  const handleExpandClick = () => {
    setIsMinimized(!isMinimized)
  }

  const handleToggleNotifications = () => {
    console.log('Clicked handleToggleNotifications')
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
          {mockData.map((data, index) => (
            <TableRow
              key={index}
              sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
            >
              <TableCell sx={{ py: 0, px: 1, fontSize: '0.875rem' }}>
                <Typography variant="body2">{data.location}</Typography>
              </TableCell>
              <TableCell>{data.serial}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <Switch
                  checked={data.notify}
                  onChange={handleToggleNotifications}
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

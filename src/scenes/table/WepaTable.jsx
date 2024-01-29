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
    <TableContainer component={Paper}>
      <IconButton onClick={handleExpandClick} aria-label="expand">
        {/* {isMinimized ? <ExpandMoreIcon></ExpandMoreIcon> : <ExpandLessIcon></ExpandLessIcon>} */}
      </IconButton>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
              Location
            </TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
              Serial #
            </TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
              Status
            </TableCell>
            <TableCell sx={{ py: 0.5, px: 1, fontSize: '0.875rem' }}>
              Notifications
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.location}</TableCell>
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

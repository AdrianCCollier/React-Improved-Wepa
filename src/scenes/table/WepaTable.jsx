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
import OpenInFullIcon from '@mui/icons-material/OpenInFull'

const WepaTable = () => {
  const [isMinimized, setIsMinimized] = useState(true)

 const [data, setData] = useState([
   {
     location: 'Aggie, Left Kiosk',
     serial: '12345',
     status: 'Green',
     notify: false,
     statusMsg: 'Printer Jam',
     printerTxt: 'Fix it fam',
     tonerLvl: '100',
     drumLvl: '100',
     beltLvl: '100',
     fuserLvl: '100',
   },
   {
     location: 'Aggie, Right Kiosk',
     serial: '12346',
     status: 'Yellow',
     notify: true,
     statusMsg: 'Low Toner',
     printerTxt: 'Refill required',
     tonerLvl: '25',
     drumLvl: '85',
     beltLvl: '60',
     fuserLvl: '90',
   },
   {
     location: 'Library, Main Entrance',
     serial: '12347',
     status: 'Red',
     notify: true,
     statusMsg: 'Paper Jam',
     printerTxt: 'Immediate attention needed',
     tonerLvl: '50',
     drumLvl: '50',
     beltLvl: '75',
     fuserLvl: '80',
   },
   {
     location: 'Student Union, Floor 1',
     serial: '12348',
     status: 'Green',
     notify: false,
     statusMsg: 'Operating Normally',
     printerTxt: 'All good',
     tonerLvl: '80',
     drumLvl: '90',
     beltLvl: '100',
     fuserLvl: '100',
   },
   {
     location: 'Engineering Building, Lab 3',
     serial: '12349',
     status: 'Yellow',
     notify: false,
     statusMsg: 'Maintenance Required',
     printerTxt: 'Checkup due',
     tonerLvl: '60',
     drumLvl: '70',
     beltLvl: '80',
     fuserLvl: '85',
   },
   {
     location: 'Business Complex, Room 201',
     serial: '12350',
     status: 'Red',
     notify: true,
     statusMsg: 'Out of Paper',
     printerTxt: 'Reload tray',
     tonerLvl: '100',
     drumLvl: '100',
     beltLvl: '100',
     fuserLvl: '100',
   },
   {
     location: 'Dormitory A, Common Area',
     serial: '12351',
     status: 'Green',
     notify: false,
     statusMsg: 'Ready for Use',
     printerTxt: 'Waiting for job',
     tonerLvl: '90',
     drumLvl: '95',
     beltLvl: '85',
     fuserLvl: '95',
   },
   {
     location: 'Health Sciences, Floor 2',
     serial: '12352',
     status: 'Yellow',
     notify: true,
     statusMsg: 'Drum Near End of Life',
     printerTxt: 'Consider replacement',
     tonerLvl: '70',
     drumLvl: '20',
     beltLvl: '90',
     fuserLvl: '90',
   },
   {
     location: 'Art Building, Studio 5',
     serial: '12353',
     status: 'Red',
     notify: false,
     statusMsg: 'Fuser Overheating',
     printerTxt: 'Shutdown required',
     tonerLvl: '100',
     drumLvl: '100',
     beltLvl: '100',
     fuserLvl: '40',
   },
 ])

  // Updated columns metadata to include all ten columns with visibility control
  const columns = [
    { id: 'location', label: 'Location', alwaysVisible: true },
    { id: 'serial', label: 'Serial ', alwaysVisible: true },
    { id: 'status', label: 'Status', alwaysVisible: true },
    { id: 'notify', label: 'Notifications', alwaysVisible: true },
    {
      id: 'statusMsg',
      label: 'Status Msg',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'printerTxt',
      label: 'Printer Text',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'tonerLvl',
      label: 'Toner %',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'drumLvl',
      label: 'Drum %',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'beltLvl',
      label: 'Belt %',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'fuserLvl',
      label: 'Fuser %',
      alwaysVisible: isMinimized ? false : true,
    },
  ]

  const handleExpandClick = () => {
    console.log('clicked handleExpandClick')
    setIsMinimized(!isMinimized)
  }

  const handleToggleNotifications = (index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return { ...item, notify: !item.notify }
      }
      return item
    })
    console.log(newData)
    setData(newData)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: '100%', textAlign: 'right' }}
    >
      <OpenInFullIcon
        sx={{
          mr: '5px',
          my: '-5px',
          cursor: 'pointer',
          transition: 'box-shadow 0.3 ease-in-out',
          '&:hover': { boxShadow: '0 0 8px 2px #202b46' },
        }}
        onClick={handleExpandClick}
        aria-label="expand"
      ></OpenInFullIcon>
      <Table
        sx={{ minWidth: 200 }}
        size="small"
        aria-label="WEPA table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {columns
              .filter((column) => column.alwaysVisible || !isMinimized)
              .map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    py: 1,
                    px: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    backgroundColor: '#202b46',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: '#202b46',
                '&:hover': { backgroundColor: 'action.selected' },
              }}
            >
              {columns
                .filter((column) => column.alwaysVisible || !isMinimized)
                .map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      py: 1,
                      px: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    {column.id === 'notify' ? (
                      <Switch
                        checked={row[column.id]}
                        onChange={() => handleToggleNotifications(index)}
                      />
                    ) : (
                      row[column.id] || 'N/A' // Fallback for any missing data
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WepaTable

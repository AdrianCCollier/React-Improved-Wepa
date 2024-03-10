import React, { useEffect, useState } from 'react'
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



  const serialToLocationMapping = {
    '01041': 'Aggie, Left Kiosk',
    '01285': 'Aggie, Right Kiosk',
    '00884': 'Business Complex 309',

    '00846': 'Zuhl, Entrance Kiosk',
    '00912': 'Zuhl, Back Kiosk',
    '00840': 'Petes, Left Kiosk',
    '03332': 'Petes, Right Kiosk',
    '00093': 'Corbett, Regular Kiosk',
    '00685': 'Corbett, Mini Kiosk',
  }

const WepaTable = ({ data }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const parsedData = data.map((item) => {

      const customSerial = item.name.replace('KIOSK_PROD_', '');
      const customLocation = serialToLocationMapping[customSerial] || item.location.locationDescription;
      const notifyState = JSON.parse(localStorage.getItem(item.name));

      return {
        ...item,
        serial: customSerial,
        location: customLocation,
        status: item.status.printerStatus,
        notifications: notifyState,
        statusMsg: item.status.kioskStatus,
        printerText: item.status.snmpAlertsText,

        tonerBlack: Math.floor(item.consumablesRemaining.toner.black),
        tonerCyan: Math.floor(item.consumablesRemaining.toner.cyan),
        tonerMagenta: Math.floor(item.consumablesRemaining.toner.magenta),
        tonerYellow: Math.floor(item.consumablesRemaining.toner.yellow),

        drumBlack: Math.floor(item.consumablesRemaining.drum.black),
        drumCyan: Math.floor(item.consumablesRemaining.drum.cyan),
        drumMagenta: Math.floor(item.consumablesRemaining.drum.magenta),
        drumYellow: Math.floor(item.consumablesRemaining.drum.yellow),

        beltLvl: Math.floor(item.consumablesRemaining.belt),
        fuserLvl: Math.floor(item.consumablesRemaining.fuser),
      }
    });
    setTableData(parsedData);
  }, [data]);

  // Updated columns metadata to include all ten columns with visibility control
  const columns = [
    { id: 'serial', label: 'Serial ', alwaysVisible: true },
    { id: 'location', label: 'Location', alwaysVisible: true },
    { id: 'status', label: 'Status', alwaysVisible: true },
    { id: 'notify', label: 'Notifications', alwaysVisible: true },
    {
      id: 'statusMsg',
      label: 'Status Msg',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'printerText',
      label: 'Printer Text',
      alwaysVisible: isMinimized ? false : true,
    },
    {
      id: 'tonerBlack',
      label: 'B',
      partOf: 'tonerLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'tonerCyan',
      label: 'C',
      partOf: 'tonerLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'tonerMagenta',
      label: 'M',
      partOf: 'tonerLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'tonerYellow',
      label: 'Y',
      partOf: 'tonerLvl',
      alwaysVisible: !isMinimized,
    },

    {
      id: 'drumBlack',
      label: 'B',
      partOf: 'drumLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'drumCyan',
      label: 'C',
      partOf: 'drumLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'drumMagenta',
      label: 'M',
      partOf: 'drumLvl',
      alwaysVisible: !isMinimized,
    },
    {
      id: 'drumYellow',
      label: 'Y',
      partOf: 'drumLvl',
      alwaysVisible: !isMinimized,
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
    const updatedTableData = tableData.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          notifications: !item.notifications, // Assuming you intend to toggle a `notifications` property
        };
        // Update Local Storage if necessary
        localStorage.setItem(
          item.serial,
          JSON.stringify(updatedItem.notifications),
        );
        return updatedItem;
      }
      return item;
    });
    setTableData(updatedTableData); // Update tableData state with the modified array
  };

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
                    py: 0.5,
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
          {tableData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
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
                      py: 0.5,
                      px: 1,
                      fontSize: '0.775rem',
                    }}
                  >
                    {column.id === 'notify' ? (
                      <Switch
                        checked={row[column.id]}
                        onChange={() => handleToggleNotifications(rowIndex)}
                      />
                    ) : (
                      row[column.id]
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

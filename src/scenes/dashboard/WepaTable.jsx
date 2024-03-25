import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from '@mui/material';

import { useSound } from './SoundContext';
import AlertModal from './AlertModal';

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
};

const WepaTable = ({ data, isMinimized, userPermission }) => {
  const [tableData, setTableData] = useState([]);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  const handleOnSnooze = () => {
    console.log('User clicked handle snooze');
    setAlertModalOpen(false);
    console.log(alertModalOpen);
  };

  const handleOnDisable = () => {
    console.log('User clicked handle disable');
    setAlertModalOpen(false);
    console.log(alertModalOpen);
  };

  const { playSound } = useSound();

  useEffect(() => {
    const parsedData = data.map((item) => {
      const customSerial = item.name.replace('KIOSK_PROD_', '');
      const customLocation =
        serialToLocationMapping[customSerial] ||
        item.location.locationDescription;

      const notificationKey = `notification_${customSerial}`;

      const notifyState =
        localStorage.getItem(notificationKey) === null
          ? true
          : JSON.parse(localStorage.getItem(notificationKey));

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
      };
    });

    if (userPermission) {
      const shouldPlaySound = parsedData.some(
        (printer) =>
          printer.notifications && ['GREEN', 'RED'].includes(printer.status),
      );

      if (shouldPlaySound) {
        playSound();
        setAlertModalOpen(true);
      }
    }

    setTableData(parsedData);
  }, [data, userPermission, playSound]);

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
  ];

  const handleToggleNotifications = (index) => {
    const updatedTableData = tableData.map((item, i) => {
      if (i === index) {
        const updatedNotifications = !item.notifications;

        const notificationKey = `notification_${item.serial}`;
        localStorage.setItem(
          notificationKey,
          JSON.stringify(updatedNotifications),
        );

        return { ...item, notifications: updatedNotifications };
      }
      return item;
    });
    setTableData(updatedTableData);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '100%', textAlign: 'right' }}
      >
        <Table
          sx={{ minWidth: 200 }}
          size='small'
          aria-label='WEPA table'
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
                          checked={row.notifications}
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
      <AlertModal
        open={alertModalOpen}
        onSnooze={handleOnSnooze}
        onDisable={handleOnDisable}
        colors={{ primary: { 400: '#FFEE58' } }}
      />
    </>
  );
};

export default WepaTable;

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
  '01041': 'Aggie, Left WEPA',
  '01285': 'Aggie, Right WEPA',
  '00884': 'BC 309 WEPA',
  '00846': 'Zuhl, Entrance WEPA',
  '00912': 'Zuhl, Back WEPA',
  '00840': 'Petes, Left WEPA',
  '03332': 'Petes, Right WEPA',
  '00093': 'Corbett, Regular WEPA',
  '00685': 'Corbett, Mini WEPA',
};

const WepaTable = ({
  shouldFetchPrinters,
  setShouldFetchPrinters,
  colors,
  data,
  isMinimized,
  userPermission,
}) => {
  const [tableData, setTableData] = useState([]);

  const [alertModalOpen, setAlertModalOpen] = useState({
    open: false,
    message: '',
    location: '',
    statusMsg: '',
    printerText: '',
  });

  const { playSound } = useSound();

  const handleOnSnooze = () => {
    console.log('User clicked handle snooze');

    setAlertModalOpen((prevState) => ({ ...prevState, open: false }));
    console.log(alertModalOpen);
  };

  const handleOnDisable = (serial) => {
    const updatedTableData = tableData.map((item) => {
      if (item.serial === serial) {
        const updatedNotifications = false;
        const notificationKey = `notification_${serial}`;
        localStorage.setItem(
          notificationKey,
          JSON.stringify(updatedNotifications),
        );
        return { ...item, notifications: updatedNotifications };
      }
      return item;
    });
    setTableData(updatedTableData);
    setAlertModalOpen((prevState) => ({ ...prevState, open: false }));
  };

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

    setTableData(parsedData);
  }, [data]);

  useEffect(() => {
    if (!shouldFetchPrinters) return;

    let soundPlayed = false;

    for (let printer of tableData) {
      if (
        printer.notifications &&
        ['YELLOW', 'RED'].includes(printer.status) &&
        !soundPlayed &&
        userPermission
      ) {
        playSound();
        soundPlayed = true;

        const alertMessage = `The ${printer.location} is down due to ${printer.statusMsg}. \n Additional Info: ${printer.printerText}`;

        setAlertModalOpen({
          open: true,
          message: alertMessage,
          location: printer.location,
          statusMsg: printer.statusMsg,
          printerText: printer.printerText,
          serial: printer.serial,
        });
        break;
      }
    }
    setShouldFetchPrinters(false);
  }, [
    shouldFetchPrinters,
    tableData,
    userPermission,
    playSound,
    setShouldFetchPrinters,
  ]);

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
        open={alertModalOpen.open}
        message={alertModalOpen.message}
        location={alertModalOpen.location}
        statusMsg={alertModalOpen.statusMsg}
        printerText={alertModalOpen.printerText}
        printerSerial={alertModalOpen.serial}
        onSnooze={handleOnSnooze}
        onDisable={handleOnDisable}
      />
    </>
  );
};

export default WepaTable;

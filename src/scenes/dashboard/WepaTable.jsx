import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { keyframes } from '@mui/material';

import { useSound } from './SoundContext';
import AlertModal from './AlertModal';
import CustomSwitch from '../../components/CustomSwitch';
import TableHeader from '../../components/TableHeader';
import {
  getTableColumns,
  serialToLocationMapping,
  locationOrder,
} from '../../components/TableDataUtils';

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

 const blink = keyframes`
  from, to { opacity: 1; }
  50% { opacity: 0.5; }
`;

const getCellStyles = (value) => {
  if (value > 5) {
    return {
      py: 0.3,
      px: 0.3,
      fontSize: '0.875rem',
      textAlign: 'center',
    };
  }

  // Calculate the animation duration based on the value (shorter duration for lower values)
  const duration = Math.max(0.5, (value / 10) * 2); // Faster blinking for lower values
  const blinkingStyle = {
    animation: `${blink} ${duration}s linear infinite`
  };

  return {
    py: 0.3,
    px: 0.3,
    fontSize: '0.875rem',
    textAlign: 'center',
    ...blinkingStyle,
  };
};






  const { playSound, stopSound } = useSound();

  const columns = getTableColumns(isMinimized);

  const handleOnSnooze = () => {
    console.log('User clicked handle snooze');

    setAlertModalOpen((prevState) => ({ ...prevState, open: false }));
    console.log(alertModalOpen);
    stopSound();
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

      stopSound();

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

    const sortedData = parsedData.sort((a, b) => {
      return (
        locationOrder.indexOf(a.location) - locationOrder.indexOf(b.location)
      );
    });

    setTableData(sortedData);
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

        // const alertMessage = `The ${printer.location} is down due to ${printer.statusMsg}. \n Additional Info: ${printer.printerText}`;
        const alertMessage = `The ${printer.location} is down.`;

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
        sx={{ maxHeight: '100%', textAlign: 'center' }}
      >
        <Table
          sx={{ width: '100%', minWidth: 200 }}
          size='small'
          aria-label='WEPA table'
          stickyHeader
        >
          <TableHeader isMinimized={isMinimized}></TableHeader>

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
                      sx={getCellStyles(row[column.id])} // Apply dynamic styling based on the consumable value
                    >
                      {column.id === 'notify' ? (
                        <CustomSwitch
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

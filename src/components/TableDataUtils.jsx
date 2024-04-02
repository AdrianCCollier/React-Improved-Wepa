import React from 'react';

export const serialToLocationMapping = {
  '01041': 'Aggie, Left WEPA',
  '01285': 'Aggie, Right WEPA',
  '00846': 'Zuhl, Entrance WEPA',
  '00912': 'Zuhl, Back WEPA',
  '00884': 'BC 309 WEPA',
  '00093': 'Corbett, Regular WEPA',
  '00685': 'Corbett, Mini WEPA',
  '00840': 'Petes, Left WEPA',
  '03332': 'Petes, Right WEPA',
};

export const locationOrder = [
  'Aggie, Left WEPA',
  'Aggie, Right WEPA',
  'Zuhl, Entrance WEPA',
  'Zuhl, Back WEPA',
  'BC 309 WEPA',
  'Corbett, Regular WEPA',
  'Corbett, Mini WEPA',
  'Petes, Left WEPA',
  'Petes, Right WEPA',
];

export const getTableColumns = (isMinimized) => [
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


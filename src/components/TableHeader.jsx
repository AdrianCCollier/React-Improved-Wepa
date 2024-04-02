import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import { getTableColumns, serialToLocationMapping, locationOrder } from './TableDataUtils';

const TableHeader = ({ isMinimized }) => {
  const columns = getTableColumns(isMinimized);

  return (
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
  );
};

export default TableHeader;

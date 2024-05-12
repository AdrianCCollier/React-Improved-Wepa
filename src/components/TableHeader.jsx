import React from 'react';
import { Table, TableHead, TableRow, TableCell } from '@mui/material';

import { getTableColumns } from './TableDataUtils';

const TableHeader = ({ isMinimized }) => {
  const columns = getTableColumns(isMinimized);


  const visibleColumns = isMinimized ? columns.slice(0, 6) : columns;


  const groupedColumns = {};
  const normalColumns = [];

  visibleColumns.forEach((column) => {
    if (column.partOf) {
      if (!groupedColumns[column.partOf]) {
        groupedColumns[column.partOf] = {
          items: [],
          label: column.group || '',
        };
      }
      groupedColumns[column.partOf].items.push(column);
    } else {
      normalColumns.push(column);
    }
  });

  return (
    <TableHead>
      <TableRow>
   
        {normalColumns.map((column) => (
          <TableCell
            key={column.id}
            sx={{
              py: 0.5,
              px: 1,
              fontSize: '0.875rem',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: '#202b46',
              verticalAlign: 'bottom',
            }}
            align='center'
            rowSpan={column.partOf ? 1 : 2}
          >
            {column.label}
          </TableCell>
        ))}

   
        {!isMinimized &&
          Object.entries(groupedColumns).map(([key, value]) => (
            <TableCell
              key={key}
              colSpan={value.items.length}
              align='center'
              sx={{ fontWeight: 'bold', backgroundColor: '#202b46' }}
            >
              {value.label}
            </TableCell>
          ))}
      </TableRow>
   
      {!isMinimized && (
        <TableRow>
          {Object.values(groupedColumns).map((group) =>
            group.items.map((subcolumn) => (
              <TableCell
                key={subcolumn.id}
                sx={{
                  py: 0.3,
                  px: 0.3,
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  backgroundColor: '#202b46',
                }}
              >
                {subcolumn.label}
              </TableCell>
            )),
          )}
        </TableRow>
      )}
    </TableHead>
  );
};

export default TableHeader;

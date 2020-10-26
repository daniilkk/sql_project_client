import React from 'react';

import {
    TableHead,
    TableRow,
    TableCell,
    Checkbox,
} from '@material-ui/core';

type EnhancedTableHeadProps = {
    numSelected: number,
    rowCount: number,
    columns: {name: string, type: string}[],
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void,
}
  
const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({ onSelectAllClick, numSelected, rowCount, columns }) => (
    <TableHead>
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
                />
            </TableCell>
            {columns.map( (column) => (
                <TableCell
                    align={column.type === 'number' ? 'right' : 'left'}
                    key={column.name}
                >
                    {column.name}
                </TableCell>      
            ))}
        </TableRow>
    </TableHead>
);

export default EnhancedTableHead;

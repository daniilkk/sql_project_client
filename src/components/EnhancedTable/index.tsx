import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
    Table,
    Paper,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Checkbox,
    TextField,
} from '@material-ui/core';

import { deleteRows, updateRow, insertRow } from '../../controllers';

import EnhancedTableToolbar from './toolbar';
import EnhancedTableHead from './head';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
    }),
);

export type RowType = {[key: string]: string | number | null}
export type RowsType = RowType[]

type EnhancedTableProps = {
    columns?: {name: string, type: string}[],
    rowsProp: RowsType,
    tableName: string,
    requestTable: () => void,
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ rowsProp, columns, tableName, requestTable }) => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [rows, setRows] = React.useState<RowsType>([]);
    const [editingData, setEditingData] = React.useState<RowType | null>(null);

    React.useEffect(() => {
        setRows(rowsProp);
    }, [rowsProp]);

    React.useEffect((() => {
        setSelected([]);
    }), [tableName]);
    
    const classes = useStyles();

    if (!columns?.length) {
        return null;
    }

    if (!rows) {
        setRows([]);
    }

    const removeRows = (ids: number[]) => {
        setRows(rows.filter( (row) => !ids.includes(row.id as number)));
    };

    const unselect = () => {
        setSelected([]);
    };

    const prepareEditingData = (id: number) => {
        let row = {...rows.find( (row) => (row.id as number) === id )} as RowType;
        delete row['id'];
        return row;
    };

    const prepareEditedRows = (id: number) => {
        let row = rows.find( (row) => (row.id as number) === id ) as RowType;
        for (const key in editingData) {
            row[key] = editingData[key];
        }
        return rows;
    };

    const prepareRowsWithNewOne = () => {
        const newRow = columns.reduce( (newRow: RowType, {name}) => {
            newRow[name] = '';
            return newRow;
        }, {});
            newRow.id = 0;
        return [newRow, ...rows];
    };

    const tooltipsClicks = {
        delete: (ids: number[]) => {
            deleteRows(ids, tableName).then( () => {
                removeRows(ids);
            });
        },
        edit: (id: number) => {
            setEditingId(id);
            setEditingData(prepareEditingData(id));
        },
        save: () => {
            updateRow(
                tableName,
                editingId as number,
                editingData as RowType
            );
            setRows(prepareEditedRows(editingId as number));
            setEditingId(null);
            setEditingData(null);
            setSelected([]);
        }, 
        add: () => {
            setRows(prepareRowsWithNewOne());
            setEditingId(0);
        },
        addSave: () => {
            insertRow(
                tableName,
                editingData as RowType
            ).then( () => {
                setRows(prepareEditedRows(editingId as number));
                requestTable();
            })
            setEditingId(null);
            setEditingData(null);
        }
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows?.map((row) => row.id as number);
            if (newSelecteds) {
                setSelected(newSelecteds);
                return;
            }
        }
        setSelected([]);
    };
    
    const handleClick = (id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
    
        setSelected(newSelected);
    };

    const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
        setEditingData({
            ...editingData,
            [columnName]: event.currentTarget.value,
        });
    }

    const isSelected = (id: number) => selected.includes(id);
    const isEditing = (id: number) => id === editingId;

    return (
        <>
            <TableContainer component={Paper}>
                <EnhancedTableToolbar
                    unselect={unselect}
                    selected={selected}
                    editingId={editingId}
                    numSelected={selected.length}
                    tableName={tableName}
                    tooltipsClicks={tooltipsClicks}
                />
                <Table className={classes.table} aria-label="customized table">
                    <EnhancedTableHead 
                        columns={columns}
                        onSelectAllClick={handleSelectAllClick}
                        numSelected={selected.length}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {rows.map( (row, index) => {
                            const isItemSelected = isSelected(row.id as number);
                            const isItemEditing = isEditing(row.id as number);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            
                            return (
                                <TableRow
                                    hover
                                    onClick={() => isItemEditing ? undefined : handleClick(row.id as number)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </TableCell>
                                    {columns.map( (column, index) => (
                                        <TableCell
                                            align={column.type === 'number' ? 'right' : 'left'}
                                            key={column.name}
                                        >
                                            {isItemEditing && index !== 0
                                            ?   <TextField 
                                                    id={column.name}
                                                    defaultValue={row[column.name]}
                                                    onChange={ (event) => handleCellChange(event as React.ChangeEvent<HTMLInputElement>, column.name)}
                                                />
                                            :   row[column.name]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export { EnhancedTable };

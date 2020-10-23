import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import {
    Table,
    Paper,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    lighten,
    Checkbox,
} from '@material-ui/core';

import { deleteRows } from '../../controllers';

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

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

type EnhancedTableToolbarProps = {
    unselect: () => void,
    numSelected: number,
    selected: number[],
    tableName: string,
    tooltipsClicks: {
        delete: (ids: number[]) => void,
        // onAdd: () => void,
        // onEdit: () => void,
    }
}
  
const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
    unselect,
    selected,
    tableName,
    numSelected,
    tooltipsClicks,
}) => {
    const classes = useToolbarStyles();
  
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {tableName}
                </Typography>
            )}
            {numSelected > 1 ? (
                <Tooltip
                    title="Delete"
                    onClick={() => {
                        tooltipsClicks.delete(selected);
                        unselect();
                    }}
                >
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : numSelected === 1 ? (
                <>
                    <Tooltip title="Edit row">
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete row(s)">
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Add row">
                    <IconButton aria-label="add">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
        );
};

type EnhancedTableHeadProps = {
    numSelected: number,
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void,
    rowCount: number,
    columns: {name: string, type: string}[],
}
  
function EnhancedTableHead(props: EnhancedTableHeadProps) {
    const { onSelectAllClick, numSelected, rowCount, columns } = props;
  
    return (
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
}

export type RowsType = {[key: string]: string | number | null}[]

type EnhancedTableProps = {
    columns?: {name: string, type: string}[],
    rowsProp: RowsType,
    tableName: string,
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ rowsProp, columns, tableName }) => {
    const [selected, setSelected] = React.useState<number[]>([]);
    const [rows, setRows] = React.useState<RowsType>([]);

    React.useEffect(() => {
        setRows(rowsProp);
    }, [rowsProp]);

    const removeRows = (ids: number[]) => {
        setRows(rows.filter( (row) => !ids.includes(row.id as number)));
    };

    const unselect = () => {
        setSelected([]);
    };

    const tooltipsClicks = {
        delete: (ids: number[]) => {
            deleteRows(ids, tableName).then( (res) => {
                removeRows(ids);
            });
        }
    };

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
    
    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
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

    const isSelected = (id: number) => selected.includes(id);

    return (
        <>
            <TableContainer component={Paper}>
                <EnhancedTableToolbar
                    unselect={unselect}
                    selected={selected}
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
                            const labelId = `enhanced-table-checkbox-${index}`;
                            
                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id as number)}
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
                                    {columns.map( (column) => (
                                        <TableCell
                                        align={column.type === 'number' ? 'right' : 'left'}
                                        key={column.name}
                                        >
                                            {row[column.name]}
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

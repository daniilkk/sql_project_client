import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
    Container,
    CssBaseline,
    Button,
    Box,
    TextField,
} from '@material-ui/core';

import { EnhancedTable, RowsType } from '../../components/EnhancedTable';
import { Select } from '../../components/Select';
import { Refresh } from '../../components/Refresh';
import { getAllTables, getTableData, refreshDB, search } from '../../controllers';
import { transformAutocompleteOptions, transformMenuItems, transformTableData } from '../../transfromers';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';

const useStyles = makeStyles(() =>
    createStyles({
        requestControl: {
            margin: '50px 0',
            position: 'relative',
        },
        searchControl: {
            margin: '50px 0',
            position: 'relative',
        },
        button: {
            margin: '12px 0 0 100px',
        },
        filterButton: {
            marginLeft: '400px',
            marginTop: '10px',
        },
        dropDatabaseButton: {
            position: 'absolute',
            right: '0',
            marginTop: '12px',
        },
        columnSelect: {
            display: 'inline',
        }
    }),
);

export type TableDataType = {
    columns?: {name: string, type: string}[],
    rows: RowsType,
}

export type MenuItemsType = {
    text: string,
    value: string,
}[]

const emptyTable: TableDataType = {rows: [], columns: undefined};

const Main: React.FC = () => {
    const classes = useStyles();
    
    const [selectedTable, setSelectedTable] = React.useState<string>('Player');
    const [tableTypesMenuItems, setTableTypesMenuItems] = React.useState<MenuItemsType>([]);

    const [selectedColumn, setSelectedColumn] = React.useState<string>('id');
    const [columnTypesMenuItems, setColumnTypesMenuItems] = React.useState<MenuItemsType>([]);
    const [autocompleteOptions, setAutocompleteOptions] = React.useState<string[]>([]);
    const [autocompleteValue, setAutocompleteValue] = React.useState<string>('');

    const [tableData, setTableData] = React.useState<TableDataType>(emptyTable);
    const [tableName, setTableName] = React.useState<string>('Player');

    React.useEffect(() => {
        getAllTables().then( (res) => {
            setTableTypesMenuItems(transformMenuItems(res));
        });
    }, []);

    const handleSelectTable = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedTable(event.target.value as string);
    };

    const handleSelectColumn = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedColumn(event.target.value as string);
        setAutocompleteOptions(transformAutocompleteOptions(event.target.value as string, tableData));
    };

    const handleAutocompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAutocompleteValue(event.currentTarget.value);
    };

    const requestTable = () => {
        getTableData(selectedTable).then( (res) => {
            setTableData(transformTableData(res));
            setTableName(selectedTable);
            setColumnTypesMenuItems(transformMenuItems(res?.columns));
            setAutocompleteOptions(transformAutocompleteOptions('id', transformTableData(res)));
        });
    };

    const requestFilteredTable = () => {
        search(selectedTable, selectedColumn, autocompleteValue).then( (res) => {
            setTableData(transformTableData(res));
        });
    };

    const refresh = () => {
        refreshDB().then( () => {
            requestTable();
        });
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    className={classes.requestControl}
                >
                    <Select 
                        menuItems={tableTypesMenuItems}
                        value={selectedTable}
                        label="Table"
                        handleSelectChange={handleSelectTable}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={requestTable}
                    >
                        Select
                    </Button>
                    <Refresh onClick={refresh} className={classes.dropDatabaseButton}/>
                </Box>
                <Box
                    className={classes.searchControl}
                >
                    <Select
                        menuItems={columnTypesMenuItems}
                        value={selectedColumn}
                        label="Column"
                        handleSelectChange={handleSelectColumn}
                    />
                    <Autocomplete
                        id="combo-box"
                        options={autocompleteOptions}
                        getOptionLabel={(option) => option}
                        style={{ 
                            width: 300,
                            display: 'inline-block',
                            position: 'absolute',
                            bottom: 10
                        }}
                        renderInput={(params) => <TextField
                                {...params}
                                label="Search"
                                variant="outlined"
                                onChange={handleAutocompleteChange}
                            />
                        }
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.filterButton}
                        onClick={requestFilteredTable}
                    >
                        Filter
                    </Button>
                </Box>
                <EnhancedTable columns={tableData.columns} rowsProp={tableData.rows} tableName={tableName} requestTable={requestTable}/>
            </Container>
        </>
    );
}

export { Main };

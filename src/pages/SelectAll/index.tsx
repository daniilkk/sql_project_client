import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
    Container,
    CssBaseline,
    Button,
    Box,
} from '@material-ui/core';

import { EnhancedTable, RowsType } from '../../components/EnhancedTable';
import { Select } from '../../components/Select';
import { DropDatabase } from '../../components/DropDatabase';
import { getAllTables, getTableData } from '../../controllers';
import { transformMenuItems, transformTableData } from '../../transfromers';

const useStyles = makeStyles(() =>
    createStyles({
        requestControl: {
            margin: '50px 0',
            position: 'relative',
        },
        button: {
            margin: '12px 0 0 100px',
        },
        dropDatabaseButton: {
            position: 'absolute',
            right: '0',
            marginTop: '12px',
        },
    }),
);

const emptyTable = {rowsProp: [], columns: undefined};

type TableDataType = {
    columns?: {name: string, type: string}[],
    rowsProp: RowsType,
}

type MenuItemsType = {
    text: string,
    value: string,
}[]

const SelectAll: React.FC = () => {
    const classes = useStyles();
    
    const [tableType, setTableType] = React.useState<string>('Player');
    const [tableName, setTableName] = React.useState<string>('Player');
    const [menuItems, setMenuItems] = React.useState<MenuItemsType>([]);
    const [tableData, setTableData] = React.useState<TableDataType>(emptyTable);

    React.useEffect(() => {
        getAllTables().then( (res) => {
            setMenuItems(transformMenuItems(res));
        });
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTableType(event.target.value as string);
    };

    const requestTable = () => {
        getTableData(tableType).then( (res) => {
            setTableData(transformTableData(res));
            setTableName(tableType);
        });
    };

    const clearTable = () => {
        setTableData(emptyTable);
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    className={classes.requestControl}
                >
                    <Select 
                        menuItems={menuItems}
                        value={tableType}
                        label="Table"
                        handleSelectChange={handleSelectChange}
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
                    <DropDatabase clearTable={clearTable} className={classes.dropDatabaseButton}/>
                </Box>
                <EnhancedTable {...tableData} tableName={tableName} />
            </Container>
        </>
    );
}

export { SelectAll };
